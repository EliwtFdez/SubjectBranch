import { useState, useEffect } from 'react';
import { auth, database } from '../../services/Firebase/configFireabase';
import { ref, push, onValue, remove, update } from 'firebase/database';

interface Materia {
  id?: string;
  nombre: string;
  profesor: string;
  aula: string;
  horaInicio: string;
  minutoInicio: string;
  periodoInicio: string;
  horaFin: string;
  minutoFin: string;
  periodoFin: string;
  userId: string;
}

export const useMateriasData = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError('No hay usuario autenticado');
      setLoading(false);
      return;
    }

    // Cambio de ruta para seguir la estructura de seguridad de Firebase
    const materiasRef = ref(database, `users/${user.uid}/materias`);
  
    const unsubscribe = onValue(
      materiasRef, 
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const materiasArray = Object.entries(data).map(([id, materia]) => ({
              id,
              ...(materia as Omit<Materia, 'id'>)
            }));
            setMaterias(materiasArray);
          } else {
            setMaterias([]);
          }
          setLoading(false);
        } catch (err) {
          setError('Error al cargar las materias');
          setLoading(false);
        }
      },
      (error) => {
        setError('Error al cargar las materias: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addMateria = async (materiaData: Omit<Materia, 'id' | 'userId'>) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario autenticado');

      const newMateria = {
        ...materiaData,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };

      // Cambio de ruta para seguir la estructura de seguridad de Firebase
      const materiasRef = ref(database, `users/${user.uid}/materias`);
      await push(materiasRef, newMateria);
      return true;
    } catch (err) {
      setError('Error al agregar la materia');
      return false;
    }
  };

  const updateMateria = async (id: string, materiaData: Partial<Materia>) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario autenticado');

      // Cambio de ruta para seguir la estructura de seguridad de Firebase
      const materiaRef = ref(database, `users/${user.uid}/materias/${id}`);
      await update(materiaRef, materiaData);
      return true;
    } catch (err) {
      setError('Error al actualizar la materia');
      return false;
    }
  };

  const deleteMateria = async (id: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario autenticado');

      // Cambio de ruta para seguir la estructura de seguridad de Firebase
      const materiaRef = ref(database, `users/${user.uid}/materias/${id}`);
      await remove(materiaRef);
      return true;
    } catch (err) {
      setError('Error al eliminar la materia');
      return false;
    }
  };

  return {
    materias,
    loading,
    error,
    addMateria,
    updateMateria,
    deleteMateria
  };
}; 