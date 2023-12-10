import { NextPage } from "next";
import HomepageLayout from './homepagelayout'

type HomePageLayout = NextPage & { layout: typeof HomepageLayout}
type  PageWithLayout = HomePageLayout

export default PageWithLayout