import { useRef, type ChangeEventHandler } from "react"
import styles from "./cover.module.css"

export const Cover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onChangeCoverImage = () => {
    fileInputRef.current?.click()
  }

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target
    console.log(target.files?.[0])
  }

  return (
    <div className={styles.cover}>
      <img src='/src/assets/mallorca-new.jpg' alt='Cover' className={styles.image} />
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
