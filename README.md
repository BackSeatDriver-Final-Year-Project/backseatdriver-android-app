<img src="https://github.com/caolanmaguire/calsickofthis/blob/main/Copy%20of%20Purple%20Sky%20Profile%20Header.png" alt="Image description" style="width: 100%;">
<!-- <img src="https://github.com/caolanmaguire/emerging_technologies/blob/main/eliza/assets/profile.webp" alt="chatbot character" width="125"> -->


# Back Seat Driver - FYP

| **Student**          | Caolán Maguire       |
|----------------------|--------------------------|
| **Title**   | "BACK SEAT DRIER" - DATA DRIVEN DRIVING INFOMATICS               |
| **Name**   | Caolán Maguire               |
| **Student ID**   | G00385433               |
| **Video Walkthrough**   |  |
| **About**   | For my FYP I've developed a telematics solution - whereas the mobile phone connects to a bluetooth OBD-II scanner connected to a vehicle - using the sensors on the car and on the mobile phone we calculate certain statistics and advice to deliver to the user via an online portal.               |

<!--<img src="https://github.com/caolanmaguire/calsickofthis/blob/main/9em9ov.gif">-->

<p>
  <img src="https://github.com/caolanmaguire/calsickofthis/blob/main/9em9ov.gif"  alt="Image description" align="left" width="350" style="margin:10; margin-right: 10px;">
</p>

## Application Function


My App is developed to allow users to post and view obituaries of individuals, I developed this project idea in response to the policy of rip.ie charging grieving families 100 euros just to announce their loved one's passing.

#### This app consists of 5 main pages:
##### Home Notices Page
  This page shows a listing of all entries on the application aswell as a search functionality for users to search for entries.
##### Family Notices Page
  This page compliments the previous page, as well as reading from an external API, it reads from a different endpoint listing different data, it also shows different components than elsewhere on the app.
##### AI assistant page
  This is the star ot the project, an AI assistant to generate touching obituaries. I appreciate it's a bit out of touch, but as a technical task it was very enjoyable to develop and I hope demonstrates a good ability of how to use prompting technology.
##### login page
  This login page is connected to my firebase account and has authentication setup for login, register and password reset functionality, once authenticated this page allows access to the logged in area.
##### Logged in area 
  This page has a form and a logout button, where the user can submit a entry to the app, and then logout of the logged in area.

## Running the Application

Follow the steps below to set up and run the application. Ensure you have the necessary prerequisites installed.

### Prerequisites

1. **Node.js**: Download and install the latest stable version of [Node.js](https://nodejs.org/).
2. **Ionic CLI**: Install the Ionic CLI globally by running:
   ```bash
   npm install -g @ionic/cli
   ```
3. **Capacitor Dependencies**: Ensure you have [Capacitor CLI](https://capacitorjs.com/) installed:
   ```bash
   npm install -g @capacitor/cli
   ```

### Steps to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DanielCreggOrganization/acpad-project-2024-caolanmaguire.git
   cd acpad-project-2024-caolanmaguire
   ```

2. **Install Dependencies**:
   ```bash
   npm install --force
   ```

3. **Add Capacitor Plugins**:
   Ensure the Capacitor Local Storage plugin is installed:
   ```bash
   npm install @capacitor/storage --force
   ```

4. **Synchronize Capacitor**:
   This ensures all plugins and dependencies are properly synced:
   ```bash
   npx cap sync
   ```

5. **Serve the Application**:
   To run the app in a development environment:
   ```bash
   ionic serve
   ```

6. **Run on a Device or Emulator**:
   If you want to test on a device or emulator:
   ```bash
   npx cap open android   # For Android
   npx cap open ios       # For iOS
   ```

### Notes

- Make sure you have Android Studio (for Android) or Xcode (for iOS) installed if testing on a real device or emulator.
- The Capacitor Local Storage plugin is pre-configured in this project. For more information, visit the [Capacitor Storage Plugin Documentation](https://capacitorjs.com/docs/apis/storage).

## Minimum Project Requirments Met

Confirm and demonstrate how you have met all minimum project requirements:

### The project, including code and documentation, will be fully contained in the provided Git repo. ✅
all code is in this GitHub repo.

### The project **MUST** contain a working Ionic Angular app that matches your chosen app. ✅
I've tested this application and it does work, I've also submitted the app to the google play store however it's still in review.

### The Ionic app must include the use of the Angular Router, Connection to a Backend service such as Firebase or Supabase, and Use of a Capacitor native plugin. ✅
  I included all of these components
    Angular Router - for navigation throughout the app
    Connection to a backend service: create, rand ead with my API backend, as well as authentication with firebase
    Capacitor native plugin: used local storage to log token for login.
### The app must not resemble in any way an app you have previously developed for another module or are currently developing for any project. ✅
  This app does not represent any previous application I've done before.
## The code MUST compile. 30% grade reduction if code does not compile when I issue the ionic serve command. ✅
  I've just tested this application and it does compile.
### The application code must be formatted in a consistent and standard way.✅
  I have formatted all the code in a consistent and standard way
### The code must contain comments. One comment per class, method and variable at minimum.✅
  I have added comments to this description.
### There must be two commits per week at the minimum. (Note: There should be many commits per day of coding.)
  I did not meet this requirement but hope to have my meeting to explain my circumstances and walkthrough the app.  
### The documentation and commentary must be free of grammar and spelling mistakes.✅
  I've run a spellchecker on this doc

## Project Requirments above and beyond
# Above and Beyond: Application Features and Design Elements

In developing my Ionic application, I implemented several features and design enhancements that surpassed the basic requirements, showcasing a commitment to innovation, usability, and performance.

- **Dynamic Data Handling**
  - Integrated a robust API that dynamically retrieves and updates records in real-time, ensuring users always interact with the most current information

- **Advanced UI/UX Design**
  - Designed a responsive app using standalone components and writing my stylesheets as well to compliment the design of the application.

- **Authentication and Security**
  - Integrated a secure authentication system with Firebase


## Application Architecture

The app is built using Ionic and Angular, is designed to be modular and easy to maintain. It’s made up of standalone components like Home, Home Services, Family Services, Login, and Logged-In Area, each handling specific tasks. These components work independently, making updates or changes straightforward. Capacitor is used to connect the app to native features for Android and iOS, like push notifications and offline functionality. The setup is managed with configuration files like angular.json and capacitor.config.ts, which handle things like building the app and integrating native features. Supporting files, such as global styles and environment settings, keep everything consistent and efficient. The app also has a secure login, dynamic navigation, and tools for testing, making it reliable and user-friendly.


```
                         +---------------------------+
                         |     Ionic Angular App     |
                         +---------------------------+
                                      |
      +---------------------+---------------------------+---------------------+
      |                     |                           |                     |
+-------------+   +-------------------+      +-------------------+   +-------------+
|  Frontend   |   |   Native Plugins  |      |   Configuration   |   |   Testing   |
+-------------+   +-------------------+      +-------------------+   +-------------+
      |                   |                           |                   |
      v                   v                           v                   v
+-------------+   +----------------+       +-------------------+   +----------------+
|  Components |   |  Capacitor API |       |  capacitor.config |   |   Jasmine/Karma|
+-------------+   +----------------+       +-------------------+   +----------------+
      |                   |                           |                   |
      v                   v                           v                   v
+-------------+   +----------------+       +-------------------+   +----------------+
|   Routing   |   |  Android Files |       |  angular.json     |   |  test.ts       |
+-------------+   +----------------+       +-------------------+   +----------------+

                          +-------------------------------------+
                          |         Components Breakdown        |
                          +-------------------------------------+
                                      |
      +--------------------+----------------------+-----------------------+
      |                    |                      |                       |
+----------------+   +------------------+   +-------------------+   +---------------+
|     Home       |   |  Home Services   |   |  Family Services  |   |    Login      |
+----------------+   +------------------+   +-------------------+   +---------------+
                                      |
                            +------------------+
                            | Logged-In Area   |
                            +------------------+
                                      |
                        +---------------------------+
                        |         Supporting        |
                        +---------------------------+
                                      |
    +---------------------+---------------------------+---------------------+
    |                     |                           |                     |
+-------------+   +-------------------+      +-------------------+   +-------------+
|   Assets    |   |   Global Styles   |      |   Environment     |   | Dependencies|
+-------------+   +-------------------+      +-------------------+   +-------------+
                                      |
                        +---------------------------+
                        |         Deployment        |
                        +---------------------------+
                                      |
                        +---------------------------+
                        |      Ionic + Capacitor    |
                        +---------------------------+
                                      |
                        +---------------------------+
                        |   Android/iOS Platforms   |
                        +---------------------------+
```

## Roadblocks and Unfinished Functionality

I regret not being able to flesh out my Logged page, I feel this could have been an interesting perspective, perhaps the functionality to delete entries after posting would have been of benefit

## Resources

Provide links to resources used:

* Previous Labs
* Lab Slides

