import React from "react";

async function page() {
  return (
    <div className="h-screen mt-8 text-white antialiased">
      <h1 className="text-3xl font-bold p-4 underline underline-offset-[24px] mb-[24px] h-fit">
        About Words & Strings
      </h1>

      <div>
        <img src="/stage3.jpeg" />
        <p className="text-xs text-right italic p-2">
          Photo by Tariq Al Fatih, 2018
        </p>
      </div>
      <p>
        Words & Strings started with a group of 5 enthusiastic and
        multi-talented youth, who are passionate about arts, and specifically
        spoken word.This group attempted to fill the gap between the existence
        of talent and the lack of consistent platform to share it, with the aim
        to create an open space for artists and art lovers to come together and
        comfortably share their talents on the only consistent, platform for
        spoken word art in Qatar.
      </p>
      <h1>Our Vision</h1>
      <p>
        Words & Strings aim to create a bilingual outlet for poets, spoken word
        artists, and musicians forming the first spoken word society in
        Qatar.Through our events, Words and Strings hope to promote and
        cultivate a love for creative writing and the literary arts in Qatar, as
        well as drop the spotlight on the local spoken and literary art
        scene.Words and Strings will further promote Qatars significant support
        of arts and talent not only locally, but in the international poetry and
        spoken word community.
      </p>
      <h1>Our Mission</h1>
      <p>
        Words & Strings aim to create an open space for artists (spoken word
        artists, poets and musicians) and art lovers to come together and
        comfortably share their talents on the only consistent, platform for
        spoken word art in Qatar. and provide the means for them to grow and
        enrich their talents in a much more structured and educational way.
      </p>
    </div>
  );
}

export default page;
