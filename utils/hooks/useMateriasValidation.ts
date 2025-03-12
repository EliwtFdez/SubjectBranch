export const useMateriaValidation = () => {
  const validarCampos = (materia: any) => {
    if (!materia.nombre || !materia.profesor || !materia.aula) {
      return false;
    }
    return true;
  };

  const mostrarErrores = () => {
    alert('Todos los campos son obligatorios');
  };

  return { validarCampos, mostrarErrores };
};

