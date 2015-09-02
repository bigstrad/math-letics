# math-letics

##STEP #1

Dependencies on npm and bower



##STEP #2

Run the following commands:

- npm init

- bower init



##STEP #3

The following configuration file must be included:

####/math-letics/node_app_config/config.js must be created and formatted as follows

```
module.exports = {
    session: {
        secret: "any_text_value_that_you_want_here_remember_it_should_be_a_secret"
    },
    video: {
        path: "full_path_to_directory_where_videos_reside_here"
    },
    mongodb: {
        uri: "mongodb://localhost:27017/math-letics"
    },
    smtp: {
        service: "Gmail",
        auth: {
            user: "user_email_here",
            pass: "password_here"
        }
    }
};
```