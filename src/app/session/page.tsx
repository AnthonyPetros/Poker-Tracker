import {Suspense} from "react";
import Session from "./SessionPage";

const Page = () => {
  return (
    <Suspense>
      <Session/>
    </Suspense>
  )
}

export default Page