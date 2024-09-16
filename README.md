<h2>Home Huddle Chat App</h2>
<p>Home Huddle is a React Native chat application designed for quick, seamless communication between friends and family. This app offers a user-friendly chat interface where users can share messages, images, and locations, even when offline. It’s accessible to users with visual impairments and leverages modern technologies like Firebase for real-time communication and data storage.</p>
<br>
<h3>Features and Requirements: </h3>

<h3>User Stories</h3>
<ul>
  <li><strong>New User Onboarding: </strong> As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.</li>
  <li><strong>Messaging: </strong> As a user, I want to be able to send messages to my friends and family members to exchange the latest news.</li>
  <li><strong>Image Sharing: </strong> As a user, I want to send images to my friends to show them what I’m currently doing.</li>
  <li><strong>Location Sharing: </strong> As a user, I want to share my location with my friends to show them where I am.</li>
  <li><strong>Offline Reading: </strong> As a user, I want to be able to read my messages offline so I can reread conversations at any time.</li>
  <li><strong>Accessibility: </strong> As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.</li>
</ul>

<br>

<h3>Key Features</h3>
<ul>
  <li><strong>User Onboarding: </strong> A page where users can enter their name and choose a background color for the chat screen before joining the chat.</li>
  <li><strong>Chat Interface </strong> A page displaying the conversation, an input field, and a submit button for sending messages.</li>
  <li><strong>Enhanced Communication: </strong> Options to send images and share location data within the chat.</li>
  <li><strong>Data Storage: </strong> Chat data is stored both online and offline, ensuring messages are accessible anytime.</li>
</ul>

<br>

<h3>Technical Requirements</h3>
<ul>
  <li><strong>Platform: </strong> The app is written in React Native.</li>
  <li><strong>Development: </strong> The app is developed using Expo.</li>
  <li><strong>Styling: </strong> The app is styled according to the provided screen design specifications.</li>
  <li><strong>Data Storage: </strong> Chat conversations are stored in Google Firestore Database.</li>
  <li><strong>Authentication: </strong> The app uses Google Firebase authentication to authenticate users anonymously.</li>
  <li><strong>Offline Storage: </strong> Chat conversations are stored locally on the user's device.</li>
  <li><strong>Media Sharing:  </strong> Users can pick and send images from their phone’s image library or take photos using the device’s camera.</li>
  <li><strong>Cloud Storage: </strong> Images are stored in Firebase Cloud Storage.</li>
  <li><strong>Location Sharing: </strong> The app can read and share the user’s location data via a map view in the chat.</li>
  <li><strong>Chat Library: </strong> The chat interface and functionality are built using the Gifted Chat library.</li>
  <li><strong>Codebase: </strong> The app’s codebase includes comments for clarity and maintainability.</li>
</ul>

<br>

<h3>Setting Up the Development Environment</h3>
<ul>
  <li><strong>Install Node.js and npm: </strong> Ensure Node.js and npm are installed on your machine. You can download them from the <a href="https://nodejs.org/">Node.js website</a>.</li>
  <li><strong>Install Expo CLI: </strong> Install Expo CLI globally by running:
    <pre><code>npm install -g expo-cli</code></pre>
  </li>
  <li><strong>Install Android Studio (for Android Emulator): </strong> Download and install <a href="https://developer.android.com/studio">Android Studio</a>. Set up an Android Virtual Device (AVD) through Android Studio to run the app on an emulator.</li>
  <li><strong>Set Up an iOS Simulator (macOS only): </strong> If you are on macOS, download Xcode from the <a href="https://apps.apple.com/us/app/xcode/id497799835?mt=12">Mac App Store</a> to set up an iOS simulator.</li>
</ul>

<br>

<h3>Cloning the Repository and Running the App Locally</h3>
<ul>
  <li><strong>Clone the Project Repository: </strong> Clone the repository to your local machine:
    <pre><code>git clone https://github.com/your-repository-url.git
cd your-repository-folder</code></pre>
  </li>
  <li><strong>Install the Dependencies: </strong> Navigate to the project directory and install the necessary libraries:
    <pre><code>npm install</code></pre>
  </li>
</ul>

<br>

<h3>Database Configuration</h3>
<ul>
  <li><strong>Create a Firebase Project: </strong> Go to the <a href="https://console.firebase.google.com/">Firebase Console</a> and create a new project called "Home Huddle Chat App".</li>
  <li><strong>Enable Firestore Database: </strong> In the Firebase console, navigate to <strong>Build > Firestore Database</strong>. Click on <strong>Create Database</strong> and choose the appropriate settings (start in test mode for development).</li>
  <li><strong>Enable Firebase Authentication: </strong> Go to <strong>Build > Authentication</strong> and set up <strong>Anonymous Authentication</strong>.</li>
  <li><strong>Enable Firebase Storage: </strong> Go to <strong>Build > Storage</strong>. Click on <strong>Get Started</strong> and follow the prompts to set up Cloud Storage.</li>
  <li><strong>Configure Firebase in Your App: </strong> Copy your Firebase configuration details from <strong>Project Settings > General</strong> in the Firebase console. Ensure your Firebase configuration in <code>App.js</code> matches the settings.</li>
</ul>

