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

export async function createCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
  if (error) {
    throw new Error("Cabin could not be created");
  }

  return data;
}
