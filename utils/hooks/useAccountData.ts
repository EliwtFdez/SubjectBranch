import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidSemestre, onlyDigits } from './helpers';
import { auth, database } from '../../services/Firebase/configFireabase';
import { ref, set, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';

interface FormData {
  nombre: string;
  matricula: string;
  semestre: string;
  carrera: string;
}

export function useAccountData() {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        matricula: '',
        semestre: '',
        carrera: ''
    });
    const [notificaciones, setNotificaciones] = useState<boolean>(true);

    // Cargar datos al montar
    useEffect(() => {
        const loadData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setFormData({
                            nombre: data.nombre || '',
                            matricula: data.matricula || '',
                            semestre: data.semestre || '',
                            carrera: data.carrera || ''
                        });
                        setNotificaciones(data.notificaciones ?? true);
                    }
                });
            }
        };

        loadData();
    }, []);

    // Manejador genérico
    const handleInputChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    // Manejo especial para semestre
    const handleSemestreChange = (text: string) => {
        const numericValue = onlyDigits(text);
        const semestre = parseInt(numericValue);
        if (isValidSemestre(semestre)) {
            setFormData({ ...formData, semestre: numericValue });
        } else if (text === '') {
            setFormData({ ...formData, semestre: '' });
        }
    };

    // Guardar datos
    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('No hay usuario autenticado');
            }

            const userRef = ref(database, `users/${user.uid}`);
            await set(userRef, {
                ...formData,
                notificaciones,
                updatedAt: new Date().toISOString()
            });

            // También guardar en AsyncStorage como respaldo
            const dataToSave = {
                formData,
                notificaciones
            };
            await AsyncStorage.setItem('@user_data', JSON.stringify(dataToSave));
            
            return true;
        } catch (error) {
            console.error('Error al guardar:', error);
            return false;
        }
    };

    const handleLogout = async () => {
        try {
            // Limpiar AsyncStorage
            await AsyncStorage.removeItem('@user_data');
            
            // Cerrar sesión en Firebase
            await signOut(auth);
            
            // Restablecer el estado local
            setFormData({
                nombre: '',
                matricula: '',
                semestre: '',
                carrera: ''
            });
            setNotificaciones(true);
            
            return true;
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            return false;
        }
    };

    return {
        formData,
        setFormData,
        notificaciones,
        setNotificaciones,
        handleInputChange,
        handleSemestreChange,
        handleSave,
        handleLogout
    };
}
