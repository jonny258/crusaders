"use client";

import "./(styles)/homepage.css";
import { Key } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_FOLLOWERS,
  GET_ALL_POSTS,
} from "./GraphQL/queries";
import Auth from "./(utils)/auth";
import Widgets from "./components/homepage/widgets";
import CreateAPost from "./components/homepage/createAPost";
import SinglePost from "./components/homepage/singlePost";

const HomeController: React.FC = () => {
  const {
    loading: allPostLoading,
    error: allPostsError,
    data: allPostsData,
  } = useQuery(GET_ALL_POSTS);

  return (
    // Original Background bg-gradient-to-tr from-lightestWhite via-slate-300 to-lightestWhite
    <div className="homePageMainDiv bg-gradient-to-tr from-mediumWhite via-mediumWhite to-mediumWhite dark:from-black dark:to-black ml-20">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 bg-mainDarkPurple border-customPurpleDark border-r-[2px] dark:border-0 dark:bg-mainPurple">
          <div className="bg-darkestWhite  dark:bg-darkModeDarkestGray h-[100%] p-2 pt-20 secondaryMenuMainDiv"></div>
        </div>
        <div className="col-span-3 pl-40">
          <div className="homePageFeedMainDiv bg- pl-2 pr-2 border-customPurpleDark dark:border-customPurple">
            <div className="feedPostsTop"></div>
            {allPostsData
              ? allPostsData.getAllPosts.map(
                  (post: any, index: Key | null | undefined) => (
                    <SinglePost post={post} key={index} />
                  )
                )
              : null}
          </div>
        </div>
        {Auth.loggedIn() && (
          <div className="col-span-2 mt-4">
            <div className="homepageInfoMainDiv">
              <CreateAPost />
              <Widgets />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeController;
