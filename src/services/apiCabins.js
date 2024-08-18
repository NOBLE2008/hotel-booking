import supabase from "./supabase";


export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createCabin(cabin, id) {
  const supabaseUrl = "https://mwzjkfdoaaxlzohqlqzl.supabase.co";
  const imageName = `${Date.now()}-${cabin.image?.name}`.split("/").join("");
  const hasUrl = cabin?.image?.startsWith?.(supabaseUrl);
  const imagePath = hasUrl
    ? cabin.image
    : `https://mwzjkfdoaaxlzohqlqzl.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (id) {
    console.log(cabin)
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
    const { data, error } = await query;
    if (error) {
      throw new Error("Cabin could not be created");
    }
    if (!hasUrl) {
      const { error: uploadError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin.image);
      if (uploadError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error("Image could not be uploaded");
      }
    }
    return data;
  } else {
    query = query.insert([{ ...cabin, image: imagePath }]).select();
    const { data, error } = await query;
    if (error) {
      throw new Error("Cabin could not be created");
    }
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);
    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Image could not be uploaded");
    }
    return data;
  }
}
