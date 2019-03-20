@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h1>This is the main page</h1>
            <div class="card">
                <div class="card-header">
                    Locale: {{ app()->getLocale() }}
                </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @if (Auth::check())
                        You are logged in!
                    @else
                        You are not logged in...
                    @endif

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
