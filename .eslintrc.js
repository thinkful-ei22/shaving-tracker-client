module.exports = {
    "extends": "airbnb",
    "rules": {
        "linebreak-style": "off",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/label-has-associated-control": [ 2, {
            "labelComponents": ["label"],
            "labelAttributes": ["htmlFor"],
            "controlComponents": ["input"]
          }]
    }
};