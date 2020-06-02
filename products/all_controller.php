<?php
require_once 'all_model.php';

class AllController
{
    private AllModel $model;

    public function __construct()
    {
        $this->model = new AllModel();
        $this->display();
    }

    private function display()
    {
        $view = new AllView();
        echo $view->getView($this->model->getAllForCard());
    }
}
