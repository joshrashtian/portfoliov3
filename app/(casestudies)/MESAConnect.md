Back in 2023, I was a student at College of the Canyons who was very interested in transferring. However, I found myself really longing for more of a social life, as community college has become an incredibly antisocial place over the years.

As someone who found group studying and friendships to be one of the biggest things that kept me motivated as I worked to transfer, I wanted to offer an olive branch for community college students to connect, especially those in STEM.

Enter MESAConnect, a personal and professional project that started out as an excuse to learn Electron and improve my React skills, but one that landed me an internship at the community college I was building it for.

# The Problem To Solve

Following COVID-19, community college engagement on campus crawled and didn't seem to be going back up. However, there were still communities on campus that gave students an outlet. For me, the hardest part was how spread out everything was, whether it was which teachers were the best, the clubs I could join, or even the events going on.

So I wanted to make a social media service that was easy to use and straightforward, giving students the resources to know what's going on around campus and engage a lot more easily, which in turn would make them more likely to come out and engage with the campus.

MESAConnect launched within the MESA department and was exclusive to MESA students. This was largely because there was already a strong community there, which made it a much better place to experiment and develop the project.

# Architecture and Development
Since it was my first major project, I decided to keep the core of it simple.

![MESAConnect architecture diagram](/projects/mesaconnect/mesaconnect-architecture.png)

I ended up using Next.js and React for a few very simple reasons:
- Lots of documentation online
- Widely adopted
- The aim was to be open source so other MESA students could contribute, and React would be a great way for students to learn React and JS.

## I. Prototype (December 2023 - Feb 2024)
My early prototype actually used something even simpler (but also flawed): React on the frontend, powered by Electron, with Firebase as the backend for auth and storage.

The early prototype had some pretty massive flaws and ended up being more of an experiment in what could be than a finished project. It did its job as a concept piece, though, and a lot of the design, even aspects like the colors and fonts, were brought into the final product.

![Prototype home page](/projects/mesaconnect/mesaconnect-prototype-home.png)
*(Home Page)*

![Prototype activity page](/projects/mesaconnect/mesaconnect-prototype-activity.png)
*(Activity Page)*

In retrospect these were very simple, but I was also brand new to college and learning React mostly from scratch. Since this project was pre-AI, I ended up relying on a lot of YouTube tutorials, even if it meant spending hours getting one system working (auth takes me less than 30 minutes now, but here it took me 3 hours).

![Prototype sign-in page](/projects/mesaconnect/mesaconnect-prototype-sign-in.png)

## Switching to Supabase from Firebase
Firebase was dropped for a few major reasons, the biggest being *cost*. Firebase had a limit of around 50,000 reads per day, and when prototyping, leaks would sometimes prevent me from using the backend at all for days.

I also found Supabase to be simpler. PostgreSQL is much more human-readable and easy to debug, and Supabase is essentially just hosted Postgres with additional features.

## Switching to Next.js from Electron
There were two very simple and practical reasons the final version and most development were done in Next.js: distribution and accessibility. It is *far easier* to distribute on the web than as an application, especially at a scale where other students could access it. An app would also add more complexity without much benefit. Throughout development, nothing required it to be an app, and the client (the community college) ultimately agreed a website was the preferred outlet for the project.

## Security
During beta, we had no verification or real barrier to account creation. This was mostly to keep the website low-key during beta testing, and it made it much easier to test the sign-in and sign-up flow with my other accounts.

That changed when a wave of bot accounts flooded the database with inappropriate posts. For a platform meant to be a welcoming space for students, it was a serious problem.

In response, we required email verification through Resend to create an account, which made automated signups much harder. Verification shipped within 24 hours, and over the following week we overhauled moderation across the site so harmful content could be caught and removed faster.

# Screenshots
![Learning page](/projects/mesaconnect/mesaconnect-learning-page.png)
Learning Page, where users could submit polls or questions to test others on.

![Social feed page](/projects/mesaconnect/mesaconnect-social-feed.png)
Social Feed Page

![Lesson builder](/projects/mesaconnect/mesaconnect-lesson-builder.png)
The Lesson Builder, which I was so proud of at the time despite how simple it seems today, especially with AI.

# Mobile
In August 2025, I also finished development on a mobile counterpart of the app. This version had some limited features compared to the website.

The app used Expo and React Native, simply because development time was far less than going native, especially with the pre-existing code and knowledge from React.

# The End?
In May 2026, I officially stopped production on the website as I was graduating. Although the project is in maintenance mode, it was the project I truly learned the most from. I learned a lot about web development and programming, and although it was far from my first project, it was my first internship and professional work experience.

The project is still live, online, and functional at mesaconnect.io. It will also remain open source, so whenever other students want to contribute and evolve the site, it will always be available to them.

This was my passion project for a while, until I found I could write web apps fluently with little to no major issues. Since I was learning as I developed it, it became the basis for a lot of my problem-solving skills. If I ever go on to teach students how to get into programming, I would probably use this project as a source for them to follow.
