import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidSemestre, onlyDigits } from './helpers';

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
        try {
            const savedData = await AsyncStorage.getItem('@user_data');
            if (savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData(parsedData.formData || {});
            setNotificaciones(parsedData.notificaciones ?? true);
            }
        } catch (error) {
            console.log('Error al cargar datos:', error);
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
        const dataToSave = {
            formData,
            notificaciones
        };
        await AsyncStorage.setItem('@user_data', JSON.stringify(dataToSave));
        return true;
        } catch (error) {
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
        handleSave
    };
}
