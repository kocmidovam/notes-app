import { supabase } from "../supabaseClient"

export const uploadImage = async (file?: File) => {
  try {
    if (!file) {
      throw new Error("You must select an image to upload")
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = fileName

    const { error } = await supabase.storage.from("images").upload(filePath, file)

    if (error) {
      throw error
    }

    return { filePath, fileName }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Upload failed"
    alert(errorMessage)
    return null
  }
}
