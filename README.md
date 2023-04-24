# Feedbacktool

Deze 360-feedbacktool is ontwikkeld door Coding Cats.

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
cd .\werkplaats-4-react-coding-cats-2
```

Maak vervolgens een VENV aan met de volgende commando's:
```
pip install virtualenv
virtualenv .venv
.\.venv\scripts\activate.ps1
```

### Vereisten

Installeer de benodigde packages terwijl je VENV is geactiveerd met het volgende commando:
```
pip install -r requirements.txt
```

## Tool runnen

Nu zou je in staat moeten zijn om de applicatie te runnen.
Geef hiervoor het volgende commando:
```
python manage.py runserver
```

Open de URL in je browser.