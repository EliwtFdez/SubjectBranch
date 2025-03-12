import { useState, useEffect } from 'react';
import { MateriasService } from '../../services/Materias.Service';
import { ref, onValue } from 'firebase/database';
import { auth, database } from '../../services/configFireabase';

export const useMateriasData = () => {
  const [materias, setMaterias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError('No hay usuario autenticado');
      setLoading(false);
      return;
    }

    const materiasRef = ref(database, `users/${user.uid}/materias`);

    // Escuchar cambios en tiempo real
    const unsubscribe = onValue(
      materiasRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const materiasArray = Object.entries(data).map(([id, materia]) => ({
              id,
              ...(materia as any),
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

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return {
    materias,
    loading,
    error,
    addMateria: MateriasService.getInstance().addMateria,
    updateMateria: MateriasService.getInstance().updateMateria,
    deleteMateria: MateriasService.getInstance().deleteMateria
  };
};
