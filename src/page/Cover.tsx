import { useRef, type ChangeEventHandler } from "react"
import styles from "./Cover.module.css"
import { FileImage } from "../components/FileImage"
import { uploadImage } from "../utils/uploadImage"

type CoverProps = {
  filePath?: string
  changePageCover: (filePath: string) => void
}

export const Cover = ({ filePath, changePageCover }: CoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onChangeCoverImage = () => {
    fileInputRef.current?.click()
  }

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const target = event.target
    const result = await uploadImage(target.files?.[0])
    if (result?.filePath) {
      changePageCover(result.filePath)
    }
  }

  return (
    <div className={styles.cover}>
      {filePath ? (
        <FileImage filePath={filePath} className={styles.image} />
      ) : (
        <img
          src={import.meta.env.BASE_URL + "mallorca-new.jpg"}
          alt='Cover'
          className={styles.image}
        />
      )}
      <button className={styles.button} onClick={onChangeCoverImage}>
        Change cover
      </button>
      <input
        onChange={onCoverImageUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
        type='file'
        name=''
        id=''
      />
    </div>
  )
}
