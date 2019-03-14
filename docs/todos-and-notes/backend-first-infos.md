# First step backend infos

## Database structure and first todo

### First todo

- Install authorization
  - confirm email
  - roles
- install russian laravel localization
- Write database structure for users, block and connectors (with targets)

#### Database structure

users
blocks
connectors 
  <polymorphic-one-to-one>
    output_condition // outputable

> I need save output connector types: clicked button, user input, calendar and so on

> I need also have possibility to save user action (input, button, data and so on) in outputable polymorphic relations

### Links
+ polymorphic custom names: <https://stackoverflow.com/questions/43612399/laravel-polymorphic-relationships-with-custom-keys>
+ also some ways: <https://stackoverflow.com/questions/22012877/laravel-eloquent-polymorphic-one-to-one>
+ installed lang package: <https://github.com/caouecs/Laravel-lang>
