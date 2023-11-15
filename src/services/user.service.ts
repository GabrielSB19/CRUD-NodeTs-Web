import UserModel, { UserInput, UserDocument, User } from "../models/user.model";
import GroupModel, { GroupInput, GroupDocument } from "../models/group.model";

class UserService {
  public async create(userInput: UserInput): Promise<UserDocument> {
    try {
      const userRecord = await UserModel.create(userInput);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<UserDocument[]> {
    try {
      const userRecords = await UserModel.find();
      return userRecords;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: string): Promise<UserDocument | null> {
    try {
      const userRecord = await UserModel.findById(id);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const userRecord = await UserModel.findOne({ email: email });
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

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

  public async delete(id: string): Promise<UserDocument | null> {
    try {
      const userRecord = await UserModel.findByIdAndDelete(id);
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  public async getUsersByGroupName(name: string): Promise<UserDocument[]> {
    try {
      const group = await GroupModel.findOne({ name: name });
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
