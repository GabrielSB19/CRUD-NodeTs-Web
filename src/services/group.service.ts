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
    userI: UserInput
  ): Promise<void> {
    try {
      const userRecord = await UserModel.findOne({ name: userI.name });
      if (!userRecord) throw new Error("User not found");

      const groupRecord = await GroupModel.findById(groupId);
      if (!groupRecord) throw new Error("Group not found");

      if (groupRecord.users.indexOf(userRecord._id) !== -1)
        throw new Error("User already exists in group");

      groupRecord.users.push(userRecord._id);
      userRecord.groups?.push(groupRecord._id);

      await groupRecord.save();
      await userRecord.save();
    } catch (error) {
      throw error;
    }
  }

  public async removeUserFromGroup(id: string, userId: string): Promise<void> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new Error("User not found");

      const group = await GroupModel.findById(id);
      if (!group) throw new Error("Group not found");

      if (!group.users.includes(user._id))
        throw new Error("User not found in group");

      group.users = group.users.filter((u) => u !== user._id);
      user.groups = user.groups?.filter((g) => g !== group._id);

      await group.save();
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  public async getUsersByGroupName(nameGroup: string): Promise<UserInput[]> {
    try {
      const groups = await GroupModel.findOne({ name: nameGroup });
      if (!groups) throw new Error("Group not found");
      return await UserModel.find({ groups: groups._id });
    } catch (error) {
      throw error;
    }
  }

  public async getGroupsByUserName(nameUser: string): Promise<GroupInput[]> {
    try {
      const users = await UserModel.findOne({ name: nameUser });
      if (!users) throw new Error("User not found");
      return await GroupModel.find({ users: users._id });
    } catch (error) {
      throw error;
    }
  }
}

export default new GroupService();
