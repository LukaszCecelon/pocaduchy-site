# poCADuchy — instrukcje projektowe

## Workflow: podział pracy Claude / Codex

Dla wszystkich nietrywialnych zadań w tym projekcie stosuj ten algorytm (ustalony z Łukaszem 2026-07-14):

1. **Plan** — wejdź w tryb planowania (`EnterPlanMode`), zbadaj kod, przygotuj plan działania.
2. **Podział ról** — w planie każdy krok/zadanie oznacz wykonawcą: **Claude** albo **Codex**. Nie zostawiaj kroków bez przypisania.
3. **Edycja** — Łukasz może edytować plan bezpośrednio w pliku planu przed zatwierdzeniem.
4. **Zatwierdzenie** — `ExitPlanMode`, czekasz na akceptację.
5. **Wykonanie zgodnie z podziałem:**
   - **Zadania Claude** — wykonujesz sam (Edit/Write/Bash/Browser), tak jak zwykle.
   - **Zadania Codex** — wywołujesz OpenAI Codex CLI przez Bash:
     ```
     codex exec "<szczegółowy, w pełni samodzielny prompt — Codex nie widzi tej rozmowy>" -s workspace-write -C "D:/poCADychy_STRONA/pocaduchy-site"
     ```
     Codex CLI (`codex-cli`, `@openai/codex`) jest zainstalowane i zalogowane (ChatGPT) na tej maszynie — nie wymaga dodatkowej autoryzacji. Po zakończeniu sprawdź wynik (`git diff`, odczyt zmienionych plików, ewentualnie build/test) **zanim** zamelduj rezultat Łukaszowi — nie ufaj bezkrytycznie podsumowaniu Codexa.

**Kryterium podziału:** Codex dobrze nadaje się do dobrze wyizolowanych, precyzyjnie opisanych podzadań wykonywalnych bez bieżącej rozmowy (np. samodzielny moduł, skrypt, refaktor o jasno określonym zakresie). Zadania wymagające ciągłości kontekstu tej rozmowy, oceny wizualnej w przeglądarce, iteracyjnych decyzji projektowych albo częstego dialogu z Łukaszem zostają przy Claude.

Prompt dla Codexa musi być w pełni samodzielny — Codex nie ma dostępu do historii tej rozmowy, więc podaj mu pełny kontekst (pliki, konwencje, cel) wprost w promptcie.
