<?php

use App\ClientInputType;
use Illuminate\Database\Seeder;

class ClientInputTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

//        factory(App\ClientInputType::class)->create();

        $data = [
            ['name'=>'Блок с кнопками', 'component' => 'SubFormButton'],
            ['name'=>'Блок с ответом', 'component' => 'SubFormAnswer'],
        ];

        ClientInputType::insert($data);

    }
}
