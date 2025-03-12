import { ref, onValue, push, update, remove } from "firebase/database";
import { auth, database } from "./configFireabase";

export class MateriasService {
  private static instance: MateriasService;
  public materias: any[] = [];
  public loading: boolean = true;
  public error: string | null = null;
  private setMaterias!: (materias: any[]) => void;
  private setLoading!: (loading: boolean) => void;
  private setError!: (error: string | null) => void;

  private constructor() {}

  public static getInstance(): MateriasService {
    if (!MateriasService.instance) {
      MateriasService.instance = new MateriasService();
    }
    return MateriasService.instance;
  }

  public initialize(setMaterias: (materias: any[]) => void, setLoading: (loading: boolean) => void, setError: (error: string | null) => void) {
    this.setMaterias = setMaterias;
    this.setLoading = setLoading;
    this.setError = setError;
    this.fetchMaterias();
  }

  private fetchMaterias() {
    const user = auth.currentUser;
    if (!user) {
      this.setError('No hay usuario autenticado');
      this.setLoading(false);
      return;
    }

    const materiasRef = ref(database, `users/${user.uid}/materias`);
    onValue(materiasRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          this.materias = Object.entries(data).map(([id, materia]) => ({ id, ...(materia as any) }));
          this.setMaterias(this.materias);
        } else {
          this.setMaterias([]);
        }
        this.setLoading(false);
      } catch (err) {
        this.setError('Error al cargar las materias');
        this.setLoading(false);
      }
    }, (error) => {
      this.setError('Error al cargar las materias: ' + error.message);
      this.setLoading(false);
    });
  }

  public async addMateria(materiaData: Omit<any, 'id' | 'userId'>) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario autenticado');

      const newMateria = {
        ...materiaData,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };

      const materiasRef = ref(database, `users/${user.uid}/materias`);
      await push(materiasRef, newMateria);
      return true;
    } catch (err) {
      this.setError('Error al agregar la materia');
      return false;
    }
  }

  public async updateMateria(id: string, materiaData: Partial<any>) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario autenticado');

      const materiaRef = ref(database, `users/${user.uid}/materias/${id}`);
      await update(materiaRef, materiaData);
      return true;
    } catch (err) {
      this.setError('Error al actualizar la materia');
      return false;
    }
  }

  public async deleteMateria(id: string) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario autenticado');

      const materiaRef = ref(database, `users/${user.uid}/materias/${id}`);
      await remove(materiaRef);
      return true;
    } catch (err) {
      this.setError('Error al eliminar la materia');
      return false;
    }
  }
}
