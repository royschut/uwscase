# uwscase
Testcase for UW-S

See in action: http://royscml113.113.axc.nl/

Op verzoek deze mini app ontwikkeld. Gevraagd werd om een home page, countdown en uploadpagina. 
Uiteraard wilde ik hier een creatieve draai aan geven: de timer loopt direct en de countdown kan deze ophogen (snoozen). Wanneer de tijd op is verschijnt de resultatenpagina. Als het goed is heeft de 'programmer' zich hiermee dus bewezen. :) Verder wat simpele CSS animatie voor wat uitstraling.

Grootste uitdaging was het gebruik van function components i.p.v. de door mij gewende classes. Was even zoeken naar het gebruik van hooks en useEffects.
Er zit nog een laatste warning in de console over een dependency die ik er niet uit kreeg, omdat ik niet wil dat het effect getriggerd wordt bij elke update van die specifieke dependency (countMS). useCallbacks geprobeerd, maar probleem bleef bestaan. Suggesties van developers die dit lezen zijn zeer welkom!

Note: Een stuk intelligentere React.JS code zit in mijn web app Tunecaster. Hier update ik de state van de App steeds met 'Value Objects', die zelf formatters en dergelijke methodes hebben. Zie mijn overige gits!

Mvg,

Roy Schut
