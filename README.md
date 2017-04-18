# LayoutLasso

  Designing a webpage layout can be a tedious process - you know where you want elements to appear on the page but coding them into place can be time-consuming. And changing your mind and moving an element can mean lining up those < div >’s all over again. That’s where LayoutLasso comes in.

  LayoutLasso is a web app that makes designing beautiful layouts easy through a visual editor and code generator. The graphical user interface allows the user to add elements to the canvas, edit their size and styling, and move them into any position on the page. Elements will snap into place with the drag and drop interface and can be infinitely nested. LayoutLasso provides a variety of commonly used web components and an in-app editor for developers to customize their elements. Custom CSS styling can be applied to one or more elements with the click of a button. Completed designs can be exported as HTML and CSS files that harness the power of the Bootstrap grid system to produce the completely customized webpage.

--

## Use it now

http://layoutlasso.herokuapp.com

## Tech used

MongoDB. Express.js. Angular.js. Node.js. HTML. CSS. jQuery. gridstack.js. Bootstrap. Ace editor. Browserify. Passport. Heroku.

This project was generated with the [Fullstack Academy Generator](https://github.com/FullstackAcademy/fsg)

## Build & development

After cloning, `npm install` (or try yarn!). This should run bower install the Gulp build process also. If not, run 'bower install' followed by 'gulp' (Gulp will then continue to watch for changes).

Then run `npm start` to view the app on http://localhost:1337/

Note: remote auth is disabled by default in the local dev env, so that you can run the app locally without setting up google and github project credentials. To test auth locally, see comments in `server/app/configure/authentication/index.js` and `app/env/index.js`
