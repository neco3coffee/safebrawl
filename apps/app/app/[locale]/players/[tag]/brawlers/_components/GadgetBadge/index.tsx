import { Buffies, Gadget } from "shared/brawl-stars-api/types";
import styles from "./index.module.scss"
import Image from "next/image";

interface GadgetBadge {
  gadgets: Gadget[] | []
  buffies: Buffies
}

export default function GadgetBadge({
  gadgets,
  buffies
}: GadgetBadge) {

  // gadgetsがある且つ、gadgetのbuffiesがある場合
  if (gadgets.length > 0 && buffies.gadget) {
    return (
      <div className={styles.gadgetContainer}>
        <Image
          src="/gadgetBadge/buffieGadgetBadge.png"
          alt="buffies gadget badge"
          fill={true}
          sizes="30px"
          unoptimized
        />
        <span className={styles.gadgets}>
          {gadgets.length}
        </span>
      </div>
    )
  }

  // gadgetsがある場合
  if (gadgets.length > 0) {
    return (
      <div className={styles.gadgetContainer}>
        <Image
          src="/gadgetBadge/gadgetBadge.png"
          alt="buffies gadget badge"
          fill={true}
          sizes="30px"
          unoptimized
        />
        <span className={styles.gadgets}>
          {gadgets.length}
        </span>
      </div>
    )
  }

  // gadgetsがない場合
  return (
    <div className={styles.gadgetContainer}></div>
  )
}