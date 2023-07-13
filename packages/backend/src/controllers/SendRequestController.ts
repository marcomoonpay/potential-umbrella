import { DateTime } from "luxon";
import { AppDataSource } from "../data-source";
import { Email } from "../entity/Email";
import { UserAPIResponse, UserProfilesAPIResponse } from "../types/ApiTypes";
import { SendRequest } from "../types/SendRequest";
import { UserNotRegisteredError } from "../types/UserNotRegisteredError";
import { UserTooOldError } from "../types/UserTooOldError";
import { userAPIUrl, userProfilesAPIUrl } from "./constants";
import { get } from "./utils";

export async function processSendRequest({
  userid: username,
  wish,
}: SendRequest): Promise<void> {
  // Fetch users from API
  const users = await get<UserAPIResponse[]>(userAPIUrl);

  // Find the user
  const user = users.find((user) => user.username === username);
  if (!user) {
    throw new UserNotRegisteredError("User is not registered into the system");
  }

  // Fetch user profiles from API
  const userProfiles = await get<UserProfilesAPIResponse[]>(userProfilesAPIUrl);

  // Find the user profile
  const userProfile = userProfiles.find(
    (userProfile) => userProfile.userUid === user.uid
  );

  if (!userProfile) {
    throw new UserNotRegisteredError(
      "User is registered into the system but has no user profile"
    );
  }

  // Compute user age
  const userAge = Math.abs(
    Math.floor(
      DateTime.fromFormat(userProfile.birthdate, "yyyy/dd/MM").diffNow("years")
        .years
    )
  );

  // Run age check
  if (userAge >= 10) {
    throw new UserTooOldError("User is too old.");
  }

  // Everything good, let's prepare the message
  await AppDataSource.getRepository<Email>(Email).insert({
    target: user.username,
    emailBody: wish,
    address: userProfile.address,
  });
}
