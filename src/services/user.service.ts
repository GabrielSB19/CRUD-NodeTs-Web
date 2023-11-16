import UserModel, { UserInput, UserDocument, User } from "../models/user.model";
import GroupModel, { GroupInput, GroupDocument } from "../models/group.model";

/**
 * Servicio que encapsula la lógica de negocio relacionada con los usuarios.
 */
class UserService {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param userInput - Datos del usuario a crear.
   * @returns Promise<UserDocument> - Documento del usuario creado.
   * @throws Error si hay un problema al crear el usuario.
   */
  public async create(userInput: UserInput): Promise<UserDocument> {
    try {
      const userRecord = await UserModel.create(userInput);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene todos los usuarios almacenados en la base de datos.
   * @returns Promise<UserDocument[]> - Lista de documentos de usuario.
   * @throws Error si hay un problema al recuperar los usuarios.
   */
  public async findAll(): Promise<UserDocument[]> {
    try {
      const userRecords = await UserModel.find();
      return userRecords;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - ID del usuario a buscar.
   * @returns Promise<UserDocument | null> - Documento del usuario encontrado o null si no existe.
   * @throws Error si hay un problema al buscar el usuario.
   */
  public async findOne(id: string): Promise<UserDocument | null> {
    try {
      const userRecord = await UserModel.findById(id);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un usuario por su dirección de correo electrónico.
   * @param email - Dirección de correo electrónico del usuario a buscar.
   * @returns Promise<UserDocument | null> - Documento del usuario encontrado o null si no existe.
   * @throws Error si hay un problema al buscar el usuario.
   */
  public async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const userRecord = await UserModel.findOne({ email: email });
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un usuario por su ID.
   * @param id - ID del usuario a actualizar.
   * @param userInput - Datos actualizados del usuario.
   * @returns Promise<UserDocument | null> - Documento del usuario actualizado o null si no existe.
   * @throws Error si hay un problema al actualizar el usuario.
   */
  public async update(
    id: string,
    userInput: UserInput
  ): Promise<UserDocument | null> {
    try {
      const userUpdate = await UserModel.updateOne({ _id: id }, userInput);
      if (userUpdate) {
        const userRecord = await UserModel.findById(id);
        return userRecord;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - ID del usuario a eliminar.
   * @returns Promise<UserDocument | null> - Documento del usuario eliminado o null si no existe.
   * @throws Error si hay un problema al eliminar el usuario.
   */
  public async delete(id: string): Promise<UserDocument | null> {
    try {
      const userRecord = await UserModel.findByIdAndDelete(id);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene todos los usuarios pertenecientes a un grupo por su ID.
   * @param id - ID del grupo al que pertenecen los usuarios.
   * @returns Promise<UserDocument[]> - Lista de documentos de usuarios asociados al grupo.
   * @throws Error si hay un problema al buscar los usuarios por grupo.
   */
  public async getUsersByGroup(id: string): Promise<UserDocument[]> {
    try {
      const group = await GroupModel.findOne({ _id: id });
      if (group) {
        const users = await UserModel.find({ groups: group._id });
        return users;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
