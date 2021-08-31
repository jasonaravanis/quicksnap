import React, { useContext } from "react";
import Card from "../../components/Card";
import RightSideBox from "../../components/RightSideBox";
import BottomMobileNav from "../../components/BottomMobileNav";

import testImage from "../../images/test-images/road.jpeg";
import testImage2 from "../../images/test-images/shells.jpeg";
import testUserProfile from "../../images/test-images/testUserProfile.png";
import testUserProfile2 from "../../images/test-images/testUserProfile2.jpg";
import davidBarrell from "../../images/test-images/RightSideBox/david.barrell.png";
import deshith from "../../images/test-images/RightSideBox/deshith.png";
import lisa from "../../images/test-images/RightSideBox/lisamwill.png";

import { UserContext } from "../Main";

function Home() {
  const cards = [
    {
      id: "random ID 1",
      author: {
        name: "Shansazz",
        profileImage: testUserProfile,
      },
      image: testImage,
      comments: [
        {
          author: "thehazelhayes",
          content: "gardens and shalas and domes, oh my!",
          id: "random ID 1",
        },
        {
          author: "oebephay",
          content: "oh hell yeaaaah 🔥",
          id: "random ID 2",
        },
        {
          author: "indstagram",
          content: "Such a cool pic!",
          id: "random ID 3",
        },
      ],
      likeCount: 999,
    },
    {
      id: "random ID 2",
      author: {
        name: "shes.the.fran",
        profileImage: testUserProfile2,
      },
      image: testImage2,
      comments: [
        {
          author: "doddleoddle",
          content: "CLEAN UR MIRROR",
          id: "random ID 1",
        },
        {
          author: "bernyoung",
          content: "Best critique",
          id: "random ID 2",
        },
        {
          author: "modern_minimal_navy",
          content: "Give me some room to breath",
          id: "random ID 3",
        },
      ],
      likeCount: 999,
    },
  ];
  const user = useContext(UserContext);

  const followSuggestions = [
    {
      id: "random ID 1",
      userName: "david.barrell",
      image: davidBarrell,
    },
    {
      id: "random ID 2",
      userName: "deshith",
      image: deshith,
    },
    {
      id: "random ID 3",
      userName: "lisamwil",
      image: lisa,
    },
  ];
  return (
    <div className="flex flex-col">
      <RightSideBox user={user} followSuggestions={followSuggestions} />
      <div className="w-full lg:w-3/5 mt-2 md:mt-auto">
        {cards && cards.map((card) => <Card key={card.id} card={card} />)}
      </div>

      <BottomMobileNav />
    </div>
  );
}

export default Home;
