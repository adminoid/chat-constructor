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
            ['name' => trans('customer.block_buttons'), 'component' => 'ModalFormBlockEditSubFormButton'],
            ['name' => trans('customer.block_answer'), 'component' => 'ModalFormBlockEditSubFormAnswer'],
        ];

        ClientInputType::insert($data);

    }
}
