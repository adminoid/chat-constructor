# Database projecting information and notes

## sequence for step-by-step create database and models structure

1. make **(0)model with migration or only migration** if model exist
2. make **(1)seed** and **(2)factory** for the model
3. **(3)migrate** with seeds
4. **(4)write relationships** for models related to recently created
5. **(5)write tests** for relations and pass it

_Good explanation for factory and faker: <https://scotch.io/tutorials/generate-dummy-laravel-data-with-model-factories>_

## sequence example step-by-step

```shell
# make model with migration
php artisan make:model Block -m

# make factory
php artisan make:factory BlockFactory

# make seeder
php artisan make:seeder BlocksTableSeeder

# make tests
php artisan make:test BlockBotRelationshipsTest
```

1. edit created migration files
2. edit factory
3. write seed with factory and test it (`php artisan migrate:refresh --seed`)
4. write relationships for Models
5. write test for test relations forward and backward
6. write test for foreign keys / cascade deleting
