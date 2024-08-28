import supabase from "./supabase";

export async function getCurrentUser() {
  console.log("Getting");
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data?.user);
  return data?.user;
}

export async function signUp({ email, password, firstName, lastName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return { data, error };
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  console.log("logout");
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUser(data) {
  console.log(data);
  //https://mwzjkfdoaaxlzohqlqzl.supabase.co/storage/v1/object/public/avatars/cabin-007.jpg
  let imageName = data?.avatar;
  if (typeof data?.avatar !== "string") {
    imageName = `${Date.now()}-${imageName[0]?.name.split("/").join("").split(" ").join("")}`;
  }

  const modifiedData = { ...data };
  const { data: updatedUser, error } = await supabase.auth.updateUser({
    data: {
      ...modifiedData,
      avatar:
        typeof data?.avatar !== "string"
          ? `https://mwzjkfdoaaxlzohqlqzl.supabase.co/storage/v1/object/public/avatars/${imageName}`
          : data?.avatar,
    },
  });
  if (error) throw new Error(error.message);
  if (typeof data?.avatar !== "string") {
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(imageName, data?.avatar[0]);
    if (uploadError) {
      throw new Error("Profile image could not be uploaded");
    }
  }

  return updatedUser;
}

export async function updatePassword(password) {
  const { data: updatedUser, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return updateUser;
}
