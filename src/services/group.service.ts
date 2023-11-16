import GroupModel, { GroupInput, GroupDocument } from "../models/group.model";
import UserModel, { UserInput } from "../models/user.model";

class GroupService {
  public async create(groupInput: GroupInput): Promise<GroupDocument> {
    try {
      const groupRecord = await GroupModel.create(groupInput);
      return groupRecord;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<GroupDocument[]> {
    try {
      const groupRecords = await GroupModel.find();
      return groupRecords;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: string): Promise<GroupDocument | null> {
    try {
      const group = await GroupModel.findById(id);
      return group;
    } catch (error) {
      throw error;
    }
  }

  public async findByName(name: string): Promise<GroupDocument | null> {
    try {
      const group = await GroupModel.findOne({ name: name });
      return group;
    } catch (error) {
      throw error;
    }
  }

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

  public async delete(id: string): Promise<GroupDocument | null> {
    try {
      const groupRecord = await GroupModel.findByIdAndDelete(id);
      return groupRecord;
    } catch (error) {
      throw error;
    }
  }

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
