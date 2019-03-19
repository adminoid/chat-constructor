# First step backend infos

## Database structure and first todo

### First todo

+ Install authorization
  + confirm email
+ install russian laravel localization
- Write database structure for users, block and connectors (with targets)
- Think about user roles [policy]

#### Database structure

users <one-to-one> customer (may be)
blocks
  <has-many> messages
    id
    delay
  <has-many> connectors <polymorphic-one-to-one> output_condition // outputable
    **Text input**
      Text Input
      Auto-Suggestion
    **Fixed options**
      Buttons
      Cards
    **Ratings**
      Star Rating
    **Data and Time**
      Calendar & Time
      Date Scroller
      Time Scroller
    **Media/Sensor**
      Image/file input
      Geo-Location
    **End Conversation**
      Auto Page Redirection
    **Special**
      No input

> I need save output connector types: clicked button, user input, calendar and so on

> I need also have possibility to save user action (input, button, data and so on) in outputable polymorphic relations

### Links
+ polymorphic custom names: <https://stackoverflow.com/questions/43612399/laravel-polymorphic-relationships-with-custom-keys>
+ also some ways: <https://stackoverflow.com/questions/22012877/laravel-eloquent-polymorphic-one-to-one>
+ installed lang package: <https://github.com/caouecs/Laravel-lang>
+ singleton use example: <https://phraseapp.com/blog/posts/laravel-i18n-frontend-best-practices/>

~~customer and integration js to other sites~~

Relationship with ordering: <https://laravel.com/docs/master/eloquent-relationships#constraining-eager-loads>
```php
$books->load(['author' => function ($query) {
    $query->orderBy('published_date', 'asc');
}]);
```

