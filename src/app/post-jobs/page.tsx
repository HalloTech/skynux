import FreelanceCarousel from "./freelanceCarousel";
import FreelanceLanding from "./freelanceLanding";
import Post from "./post";
import PostJobBanner from "./postJobBanner";


export default function PostJobs() {
  return (
    <>
        <Post/>
        <FreelanceCarousel/>
        <FreelanceLanding/>
        <PostJobBanner/>
    </>
  );
}
