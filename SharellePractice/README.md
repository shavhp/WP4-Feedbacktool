# Oefenproject Django en React

Ik heb geoefend met het gebruik van Django met React,
voornamelijk omdat ik een andere manier moest hebben om 
een view te maken voor tabellen. Django-tables2 zou niet werken
in combinatie met React.

Project afkomstig van 
https://blog.logrocket.com/using-react-django-create-app-tutorial/

## Installatie

### Virtual Environment (VENV)

Om de applicatie te kunnen starten moet er eerst een VENV worden aangemaakt.

Bij gebruik op Windows kan het nodig zijn om eerst het uitvoeringsbeleid
van PowerShell te wijzigen.
1. Zoek PowerShell in de Windows zoekbalk.
2. Open PowerShell als administrator.
3. Type het volgende commando in PowerShell:
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Zorg dat je je in je terminal bevindt in de directory hieronder, of gebruik het commando
hieronder om er naartoe te navigeren:
```
cd .\werkplaats-4-react-coding-cats-2\SharellePractice
```

Maak vervolgens een VENV aan met de volgende commando's:
```
pip install virtualenv
virtualenv practice_env
.\.venv\scripts\activate
```

### Vereisten

Installeer de benodigde packages terwijl je VENV is geactiveerd met het volgende commando:
```
pip install -r requirements.txt
```

## Tool runnen

Nu zou je in staat moeten zijn om de applicatie te runnen. Hiervoor moeten twee commando's worden gegeven:

```
python manage.py runserver
```

Navigeer, eventueel in een tweede terminal, naar de volgende directory:
```
cd .\werkplaats-4-react-coding-cats-2\SharellePractice\students-fe
```
Geef het volgende commando:
```
npm start
```

Open de URL `http://localhost:3000` in je browser.