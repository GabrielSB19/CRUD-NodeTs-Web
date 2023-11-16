import GroupModel, { GroupInput, GroupDocument } from "../models/group.model";
import UserModel, { UserInput } from "../models/user.model";

/**
 * Servicio que encapsula la lógica de negocio relacionada con los grupos.
 */
class GroupService {
  /**
   * Crea un nuevo grupo en la base de datos.
   * @param groupInput - Datos del grupo a crear.
   * @returns Promise<GroupDocument> - Documento del grupo creado.
   * @throws Error si hay un problema al crear el grupo.
   */
  public async create(groupInput: GroupInput): Promise<GroupDocument> {
    try {
      const groupRecord = await GroupModel.create(groupInput);
      return groupRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene todos los grupos almacenados en la base de datos.
   * @returns Promise<GroupDocument[]> - Lista de documentos de grupo.
   * @throws Error si hay un problema al recuperar los grupos.
   */
  public async findAll(): Promise<GroupDocument[]> {
    try {
      const groupRecords = await GroupModel.find();
      return groupRecords;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un grupo por su ID.
   * @param id - ID del grupo a buscar.
   * @returns Promise<GroupDocument | null> - Documento del grupo encontrado o null si no existe.
   * @throws Error si hay un problema al buscar el grupo.
   */
  public async findOne(id: string): Promise<GroupDocument | null> {
    try {
      const group = await GroupModel.findById(id);
      return group;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un grupo por su nombre.
   * @param name - Nombre del grupo a buscar.
   * @returns Promise<GroupDocument | null> - Documento del grupo encontrado o null si no existe.
   * @throws Error si hay un problema al buscar el grupo.
   */
  public async findByName(name: string): Promise<GroupDocument | null> {
    try {
      const group = await GroupModel.findOne({ name: name });
      return group;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un grupo por su ID.
   * @param id - ID del grupo a actualizar.
   * @param groupInput - Datos actualizados del grupo.
   * @returns Promise<GroupDocument | null> - Documento del grupo actualizado o null si no existe.
   * @throws Error si hay un problema al actualizar el grupo.
   */
  public async update(
    id: string,
    groupInput: GroupInput
  ): Promise<GroupDocument | null> {
    try {
      const groupUpdate = await GroupModel.updateOne({ _id: id }, groupInput);
      if (groupUpdate) {
        const groupRecord = await GroupModel.findById(id);
        return groupRecord;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina un grupo por su ID.
   * @param id - ID del grupo a eliminar.
   * @returns Promise<GroupDocument | null> - Documento del grupo eliminado o null si no existe.
   * @throws Error si hay un problema al eliminar el grupo.
   */
  public async delete(id: string): Promise<GroupDocument | null> {
    try {
      const groupRecord = await GroupModel.findByIdAndDelete(id);
      return groupRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Agrega un usuario a un grupo por sus IDs.
   * @param groupId - ID del grupo al que se va a agregar el usuario.
   * @param userId - ID del usuario que se va a agregar al grupo.
   * @returns Promise<GroupDocument | null> - Documento del grupo actualizado o null si no existe.
   * @throws Error si hay un problema al agregar el usuario al grupo.
   */
  public async addUserToGroup(
    groupId: string,
    useId: string
  ): Promise<GroupDocument | null> {
    try {
      const userRecord = await UserModel.findOne({ _id: useId });
      if (!userRecord) throw new Error("User not found");

      const groupRecord = await GroupModel.findById(groupId);
      if (!groupRecord) throw new Error("Group not found");

      if (groupRecord.users.indexOf(userRecord._id) !== -1)
        throw new Error("User already exists in group");

      groupRecord.users.push(userRecord._id);
      userRecord.groups?.push(groupRecord._id);

      await groupRecord.save();
      await userRecord.save();

      return groupRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina un usuario de un grupo por sus IDs.
   * @param groupId - ID del grupo del que se va a eliminar el usuario.
   * @param userId - ID del usuario que se va a eliminar del grupo.
   * @returns Promise<GroupDocument | null> - Documento del grupo actualizado o null si no existe.
   * @throws Error si hay un problema al eliminar el usuario del grupo.
   */
  public async removeUserFromGroup(
    idGroup: string,
    idUser: string
  ): Promise<GroupDocument | null> {
    try {
      const user = await UserModel.findOne({ _id: idUser });
      if (!user) throw new Error("User not found");
      const group = await GroupModel.findOne({ _id: idGroup });
      if (!group) throw new Error("Group not found");

      if (group.users.indexOf(user._id) === -1)
        throw new Error("User not found in group");

      user.groups = user.groups?.filter((g) => {
        return g.toString() !== idGroup;
      });
      group.users = group.users.filter((u) => {
        return u.toString() !== idUser;
      });

      await group.save();
      await user.save();

      return group;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene todos los grupos a los que pertenece un usuario por su ID.
   * @param userId - ID del usuario.
   * @returns Promise<GroupDocument[]> - Lista de documentos de grupos asociados al usuario.
   * @throws Error si hay un problema al buscar los grupos por usuario.
   */
  public async getGroupsByUser(id: string): Promise<GroupDocument[]> {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        const groups = await GroupModel.find({ users: user?._id }).populate(
          "users"
        );

        return groups;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
}

export default new GroupService();
