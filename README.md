# Social Media Project

In this project, I aimed to use as much modern technology as possible. The site interface was inspired by Telegram and Instagram.
A third-party API was used to retrieve data. The social network has most of the features required for a modern consumer, including:

### Features:
- **Chat with selected users**: Allows direct private communication.
- **Global chat**: A shared space for everyone, cleared once a day.
- **User search with filters**: Simplifies finding specific users.
- **Subscriptions**: Ability to subscribe to a user and view subscriptions on their page.
- **Profile management**: Edit your profile and fill it with personal information.
- **Responsive design**: Layout optimized for convenient usage on mobile devices.
- **Theme switching**: Toggle between light and dark themes.
- **Language switching**: Support for English and Ukrainian languages.

### Development:
To speed up development and reduce the number of bugs and fix commits, extensive testing was performed:
- **Unit tests**: Written using Jest.
- **Component tests**: Done using React Testing Library.
- **E2E tests**: Implemented with WebDriver.

### Highlights:
- Implemented switching between light and dark themes, as well as language switching with `i18n`.
- Integrated frontend with a third-party API using provided documentation.
- Added pagination and filtering for user search and chat message loading when scrolling.
- Developed chat functionality using WebSocket and dialogue pages using polling for new messages, with caching via RTK Query.
- Used semantic HTML and `React Helmet` for dynamic metadata generation.
- Migrated the project from CRA to Vite for faster TypeScript transpilation.

### Stack:
- **Frontend**: TypeScript, React, Redux, MUI, React Hook Form
- **API Integration**: REST, Axios, RTK Query, WebSocket
- **Testing**: Jest, React Testing Library, WebDriver
- **Internationalization**: i18n
- **Build Tools**: Vite, Docker

---

This project demonstrates a modern, responsive, and feature-rich social media application with cutting-edge technologies.
