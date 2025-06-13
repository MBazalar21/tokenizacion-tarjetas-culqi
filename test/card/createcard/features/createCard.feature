Feature: Crear una tarjeta

  Scenario: Crear tarjeta con datos válidos
    Given los datos de la tarjeta son válidos
    When realizo una petición POST a /card
    Then el sistema debe responder con los datos de la tarjeta creada y un código 201
