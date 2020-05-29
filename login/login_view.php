<?php

class LoginView
{
    public function getView($page, $error)
    {
        ob_start();
        include 'login.tpl';
        $output = ob_get_contents();
        ob_end_clean();
        return $output;
    }
}
