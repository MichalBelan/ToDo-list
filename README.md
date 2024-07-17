# Aplikácia na správu úloh

Jednoduchá aplikácia na správu úloh vytvorená pomocou React. 
Táto aplikácia umožňuje používateľom vytvárať, upravovať a spravovať úlohy v rôznych zoznamoch a podporuje funkcie ako značky, priority a dátumy splnenia.

## Funkcie

- **Pridanie úloh**: Vytvorte nové úlohy s názvom, značkami, prioritou a dátumom splnenia.
- **Úprava úloh**: Upravte existujúce úlohy.
- **Zmazanie úloh**: Odstráňte úlohy zo zoznamu.
- **Tmavý/Svetlý režim**: Prepínanie medzi tmavým a svetlým témou.
- **Správa zoznamov**: Prechod medzi rôznymi zoznamami úloh (Predvolený, Práca, Osobný).
- **Dokončenie úloh**: Označte úlohy ako dokončené.

## Použité technológie

- **React**: Frontendový framework na vytváranie používateľského rozhrania.
- **Axios**: Na vykonávanie HTTP požiadaviek na mock API.
- **PropTypes**: Na typovú kontrolu props komponentov React.

## Začiatok

### Požiadavky

- Nainštalovaný Node.js a npm na vašom počítači.

### Inštalácia

1. Klonujte repozitár:

   ```bash
   git clone https://github.com/vasouzivatel/task-management-app.git
   cd todo-list
   
2. Nainštalujte závislosti:
   npm install
   
3. Spustite vývojový server:
   npm start
   
4. Otvorte prehliadač a prejdite na http://localhost:3000. 
   
### Použitie
- Použite vstupné polia na pridanie novej úlohy.
- Priraďte značky oddelené čiarkami.
- Vyberte úroveň priority a nastavte dátum splnenia.
- Kliknite na "Add" na uloženie úlohy.
- Úprava alebo zmazanie úloh podľa potreby.

### API
- Táto aplikácia používa mock API hostované na MockAPI na simuláciu CRUD operácií pre úlohy. Základná URL pre API úloh je:
  https://6694d9cc4bd61d8314c8e5df.mockapi.io/api/v1/todos
