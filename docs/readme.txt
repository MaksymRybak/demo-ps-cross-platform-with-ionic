Workshopt: Cross platform with Ionic https://app.pluralsight.com/library/courses/ng-conf-2020-session-44/table-of-contents

Anche qui all'inizio viene fatto un confronto tra app native, app ibride (compilazione in app nativa) e web.
	vedi video per dettagli (pros and cons di ogni approccio)
	note se addottiamo una soluzione nativa:
		per es. se siamo su iOS possiamo usare Objective-C o Swift
				se siamo su Android possisamo usare Java o Kotlin
		due progetti separati, due team diversi, management complicato, manutenzione di due code bases 
	note se addottiamo la soluzione che ci consente di buildare il progetto in una app nativa
		qui possiamo usare una tecnologia che conosciamo (per esempio web, javascript)
		per non e' chiaro il contatto tra il nostro codice e il codice nativo prodotto dalla compilazione - e' difficile determinare nel caso di un problema 
			dov'è sta l'inghippo, nel nostro codice o nel codice nativo quindi lato framework (libreria) di compilazione 
		spesso dobbiamo approfondire lo sviluppo nativo piu' di quanto ci piacerebbe
	note se usiamo tecnologie web
		tecnologie che conosciamo (html, css, js), standard aperti, community molto grande 
		nel contesto web non abbiamo un sdk, mettiamo i pezzi insieme in base alle nostre esigenze
	ionic
		soluzione per creare le app per ios, android e pwa 
		e' una collezione di componenti, animazione e gesti 
		garantisce cosi detto platform continuity - se siamo su ios, abbiamo un look and fill di ios, se siamo su android, la ui e' quella di android 
			per la web ui lo standard di ultimi anni e' material design - ionic lo usa nei propri componenti 
Ionic framework offre:
	- componenti della UI per app native mobile, PWAs, Desktop
	- Pre-build Gestures e Animations
	- Platform continuity per iOS e Material Design
	- Pieno accesso alle API native e plugin
	- community molto attiva a livello internazionale
	si consiglia di consultare https://atomicdesign.bradfrost.com/ - come fare design system, progettare componenti in maniera isolata etc..
	il progetto Capacitor, creato da Ionic, serve per avere accesso alle funzionalita' native del device
		Capacitor puo' essere utilizzato al di fuori di Ionic 
Creazione di una app demo
	comando "ionic start" per creare il progetto vuoto (scegliamo template blank)
	comando "ionic serve" per lanciare l'app in locale 
	usiamo angular come framework di sviluppo, per cio' la struttura del progetto e' molto simile a quella di un progetto angular 
	vediamo piu' in dettaglio il modulo root - app.module.ts
		nel parametro importo vediamo "IonicModule.forRoot(), AppRoutingModule" - serve per avere accesso ai componenti di ionic, provider di default,
			in poche parole importiamo tutto quello che server ad ionic per funzionare all'interno di moduli angular 
		nel parametro providers vediamo "{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }" - e' una differenza tra un progetto angular e quello ionic-angular
			se siamo in un progetto angular ci aspettiamo che la pagina non cambia durante la navigazione
			e ci sottoscriviamo al cambiamento di parametri di routing per poter aggiornare la nostra UI
			INVECE x ionic viene seguito l'approccio che abbiamo se fosse una app mobile 
			cioe', possiamo eseguire la navigazione verso lo stesso componente (NON viene riutilizzato lo stesso componente ma si crea sempre uno nuovo!)
			in questo caso possiamo passare diversi parametri e aggiornare la nostra UI di conseguenza
	vediamo piu' in dettaglio il componente master - app.component.ts 
		il template contiene 
			<ion-app>										-> contenitore padre, viene impostato un font di default, size e padding di default etc...
			  <ion-router-outlet></ion-router-outlet>		-> simile ad router-outlet di angular con piu' funzionalita' x gesti e transizione 
			</ion-app>
	vediamo piu' in dettaglio la configurazione base di routing - app-routing.module.ts
		qui viene configurato il modulo home caricato durante la navigazione verso il base path 
		HomePageModule a sua volta contiene una sua configurazione (moduli importati di cui IonicModule + modulo contenente la configurazione di routing)
			alla fine arriviamo al primo componente caricato (e' un componente angular)
		NOTA: ionic fa una distinzione tra che cos'e' una PAGINA e un COMPONENTE
			una PAGINA (es. HomePage) viene sempre associata ad una rotta, quandi eseguiamo la navigazione verso una rotta ci aspettiamo il caricamento di una pagina
			un COMPONENTE invece non e' associato alla rotta e' puo' essere usato come un componente innestato all'interno di una pagina (o altro componente) 
				oppure caricato programmaticamente
	struttura base di una pagina
		header (qui non abbiamo dei css particolari)
			toolbar (di default alto 56px)
				title
		content (flex based! ridimenzionato automaticamente in base alla presenza di header e/o footer)
				e' il container principale della nostra pagina
				possiamo avere solo un content per pagina 
				qui possiamo usare tutti i componenti che offre ionic (vedi https://ionicframework.com/docs/components)
					ogni componente ha delle proprieta' che possiamo cambiare
					css e' customizzabile impostando opportunamente le variabili riportate nella documentazione 
		footer (qui non abbiamo dei css particolari)
			toolbar (di default alto 56px)
				title 
	continuiamo creando nuovi componenti x la nostra app
		per generare una nuova pagina digitiamo "ionic g page detail" 
			viene creato un modulo dedicato aggiornando il modulo di routing 
			ricordiamo la differenza tra una pagina e un componente nel contesto ionic
		modifichiamo la lista di item in modo che al click su un item si apre la pagina di dettaglio 
		aggiungiamo alla pagina di dettaglio il pulsante back - abbiamo una animazione di navigazione avanti indietro - NOTA: per posizionare il pulsante back 
			sulla stessa riga di title usiamo attributo slot di <ion-button> - NOTA: per vedere il pulsante back anche nel momento di primo caricamento della pagina 
			di dettaglio (quando la apriamo senza passare da lista ma digitando url di dettaglio nella barra di indirizzo del browser) settiamo attributo defaultHref 
			di <ion-back-button>
		concetto di SLOT
			ionic usa per i propri componenti i web components
			i web components ha il concetto di slot per capire dove collocare gli elementi 
			usando il tool di sviluppo di chrome possiamo vedere slot supportati (sezione Shadow Content) - start, secondary, primary, end 
			il concetto di slot e' paragonabile al concetto di ng-content di angular, quando definiamo i selector per un contenuto specifico 
		in questo progetto possiamo usare i servizio angular per recuperare i dati, usare NgRx per una gestione dello stato della nostra app etc..
	continuiamo modificando la visualizzazione di nostri item 
		per usare le immagini abbiamo a disposizione due componenti di ionic
			<ion-avatar>			-- ridimensiona l'immagine e la include in un container cerchio (di default height = width = 40px)
			<ion-thumbnail>			-- ridimensiona l'immagine e la include in un container quadrato (di default height = width = 56px)
		per distanziare l'immagine dal testo usiamo SLOT (per es. settiamo slot="start")
		usiamo attributo lines="full" (su ion-list / ion-item) per estendere le righe separatori orizzontalmente (default="inser", possiamo nasconderli con lines="none")
		NOTA: se un elemento non ha attributo slot specificato, viene usato lo slot di default (quello senza nome) come container dell'elemento
			  possiamo avere il markup HTML differente da come vediamo i nostri elementi sulla pagina HTML finale - teniamo in mente sempre il concetto di SLOT!!!
			  attributo slot viene usato per impostare la logica di posizionamento di nostri elementi 
		per impostare i colori si usano delle convenzioni (theming convention)
			x i colori abbiamo: primary, secondary, dark, danger, warning etc..
			usiamo l'attributo color (es. color="primary")
			per vedere tutti i colori fare riferimento al file "variables.scss" all'interno della cartella theme del progetto 
			quasi tutti componenti di ionic gestiscono attributo color 
	continuiamo usando un api per ottenere i dati 
		api https://randomuser.me/api/
		usiamo HttpClient direttamente all'interno della pagina (e' meglio sempre creare un servizio responsabile di recupero dei dati)
		per recuperare i dati dall'API possiamo usare il metodo ngOnInit, MA ionic prevede un evento specifico del sistema di animazione 
			ionViewDidEnter() - questo metodo viene eseguito dopo ngOnInit() 
			qui https://ionicframework.com/docs/angular/lifecycle ci sono i dettaglio sugli eventi di ionic 
			tutti questi eventi permettono a modificare il nostro DOM in momento piu' opportuno senza creare i problemi di performance durante l'animazione per esempio
		NOTA: quando eseguiamo la navigazione aprendo il dettaglio dell'item (nostra demo) il componente contenente la lista non viene distrutto e rimane nascosto
			  quando torniamo indietro (pulsante back) il componente viene riattivato e messo visibile 
			  per aggiungere una logica custom nel momento di ritorno usiamo gli hook previsti da ionic (es. ionViewDidEnter)
		usiamo <ion-refresher> per aggiornare elementi della nostra lista 
			quando "tiriamo" giu' la nostra lista, appare una rotellina di caricamento, che scompare quando l'evento di caricamento e' stato gestito e abbiamo 
				chiamato event.detail.complete() 
		per gestire la paginazione o caricamento di nuovi elementi in coda a quelli gia' visualizzati possiamo usare il componente <ion-infinite-scroll>
			la rotellina di caricamento apparte sotto la lista di item (la dobbiamo collocare dopo la lista di elementi)
			la rotellina appare quando "tiriamo" su la lista di elementi 
	aggiungiamo un componente utile a mostrare un alert (visualizzato in un popup) 
		si usa AlertController di @ionic/angular 
		implementiamo un metodo async che all'interno crea un alert (e' una operazione asincrona)
		il contenuto del popup di alert viene specificato usando un oggetto con proprieta' custom 
	popup modale - e' un nuovo componente mostrato in una finestra modale 
		creiamo il componente usando il comando "ionic g component Modal --createModule"
		(NOTA: nel modulo di component aggiungiamo il parametro  entryComponents: [ModalComponent])
		creiamo un nuovo metodo async per mostrare il nostro componente in una finestra modale 
		per creare una modale usiamo ModalController di @ionic/angular (simile a come abbiamo fatto con alert)
		per passare i dati al componente usiamo il parametro componentProps lato il componente padre, e @Input() lato il componente caricato nella modale (vedi codice)
	due note sul tema di UI
		ionic usa le variabili CSS
		se apriamo la console di sviluppo del nostro browser, selezioniamo elemento <body>, vediamo la sezione :root { ... } contenente tutte le variabili che 
			possiamo usare. La variabile puo' essere usata in una nostra classe CSS, per es. #my-css-class { color: var(--ion-color-primary); }
		NOTA: se vogliamo cambiare lo stile definito dal componente dobbiamo cambiare il valore della variabile (se usiamo css, il nostro stile non 
			viene applicato, questo comportamento e' dovuto all'utilizzo di shadow DOM da parte di componente + variabili css.
			es:
				ion-item {
					--min-height: 100px;
				}
			per capire le variabili che possiamo usare per customizzare il look and fill della nostra UI dobbiamo fare riferimento alla documentazione del componente
				per es. se parliamo di <ion-item>, https://ionicframework.com/docs/api/item#css-custom-properties
			possiamo cambiare il valore di una proprieta' a livello globale - e' sufficiente definire il nuovo valore all'interno di theme/variables.scss 
			oppure modifichiamo i valori di variabili css definiti all'interno di :root nel file theme/variables.scss  (la modifica si propaga a tutti i componenti)
			x creare i colori custom per la nostra app ionic offre un generatore di colori https://ionicframework.com/docs/theming/color-generator
				alla fine copiamo la sezione :root { ... } dal sito e la incolliamo nel file variables.scss 
		recap: possiamo modificare lo stile a livello globale, a livello globale ma per un componente, a livello di singoli componenti della nostra app
	vediamo come possiamo introdurre una navigazione piu' complicata nella nostra app
		possiamo introdurre il componente di menu <ion-menu> all'interno di app.component.html
		es:
			 <ion-menu contentId="main">	--contentId serve a referenziare l'area aggiornata nel momento di selezione di una voce di menu
				<ion-content>
				  <h1>Hello</h1>
				</ion-content>
			 </ion-menu>
		usando <ion-menu> possiamo aggiungere dei link ad altre aree della nostra app, per es.
			 <ion-list>
				<ion-menu-toggle>	-- serve per nascondere side menu quando clicchiamo sull'item 
				  <ion-item routerLink="/detail/1">Got to detail</ion-item>
				</ion-menu-toggle>
			 </ion-list>
	vediamo esempio di tabs 
		eseguiamo due volte il comando ionic g page generando due nuove pagine (tabs, tab2)
		modifichiamo il file contenente il routing dell'app facendo redirect a tabs se utente digita /
		modifichiamo il file di routing del modulo tabs aggiungendo nuove rotte (vedi il progetto)
		modifichiamo html della pagina tabs in questo modo 
			<ion-tabs>
			  <ion-tab-bar slot="bottom">
				<ion-tab-button tab="tab1">		--qui referenziamo una rotta definita nel file di routing 
				  <ion-label>Tab 1</ion-label>
				</ion-tab-button>
			  </ion-tab-bar>
			</ion-tabs>
		aggiungiamo il pulsante per il tab2 in modo simile 
		il click su ogni tab-button comporta al caricamento della pagina relativa
		NOTA: ogni tab puo' avere una sua navigazione, la navigazione NON viene persa quando cambiamo le pagina usando i tabs
		abbiamo usato il file tabs-routing.module.ts per configurare il routing relativo ai tabs, ma lo potevamo fare anche nel file app-routing.module.ts
		(facendo come abbiamo fatto noi il codice risulta piu' organizzato)
	per visualizzare il menu laterale sempre quando siamo su un breakpoint desktop aggiungiamo il container <ion-split-pane contentId="main"> 
		per i nostri elementi <ion-menu> e <ion-router-outlet>
		ogni item del menu laterale e' visibile solo se ha attributo autoHide (es. <ion-menu-toggle autoHide="false">) impostato a false
	NOTA: come abbiamo visto con il menu e tabs ionic offre la possibilita' di avere una navigazione complessa e indipendente tra diverse pagine della nostra app 
	NOTA: il caricamento delle nostre rotte e' lazy (angular lazy loading routes)
	NOTA: componenti ionic seguono una logica di customizzazione comune, custom properties etc..
	procediamo approfondendo la parte di PWA della nostra app ionic 
		per aggiungere "i pezzi" necessari per PWA eseguimo il comando "ng add @angular/pwa" (si tratta di funzionalita' di service worker)
		nell app.component.ts importiamo SwUpdate e ToastController, creiamo async ngOnInit() per poter fare la sottoscrizione agli eventi di Service Worker 
		usiamo ToastController per mostrare all'utente gli aggiornamenti ricevuti da Service Worker 
		NOTA: vedi il codice sorgente, da quello che ho capito e' il modo di mostrare all'utente qualcosa quando un contenuto specifico della nostra app cambia 
		      il contenuto che stiamo monitorando viene cachato da Service Worker 
			  il file ngsw-config.json contiene assets cachati da Service Worker
				la sezione assetGroups - la parte app specifica i file caricati in cache ancora prima che l'app viene aperta all'utente 
				(questo si capisce anche dalla riga "installMode": "prefetch"), la parte assets invece contiene le risorse caricate al bisogno (lazy)
		creiamo la build di produzione digitando "ng build --prod"
		tutti i file che troviamo sotto la cartella www del nostro progetto, una volta che eseguiamo il deploy, saranno cachati dal service worker 
		NOTA: il modulo di service worker viene attivato solo se facciamo la build di produzione (come si vede nel app.module.ts)
		NOTA: all'interno della nostra app possiamo usare tutte le funzionalita' che offre angular nel contesto di Service Worker (consultare la guida di angular)
			https://angular.io/guide/service-worker-intro
	vediamo l'utilizzo di capacitor (il ponte tra la nostra app e il dispositivo)
		per aggiungere capacitor al progetto eseguiamo il comando "ionic integrations enable capacitor"
			- viene aggiunta una nuova dipendenza in package.json
			- si modifica il file ionic.config.json con aggiunta della parte di capacitor 
		quando abbiamo abilitato capacitor eseguiamo il comando "npx cap init" - viene creato il file di configurazione di capacitor "capacitor.config.json"
		eseguiamo il comando "npm i @ionic/pwa-elements" - si installa una libreria di utility che calma il gap che esiste in web implementando le API mancanti 
			per esempio sono i pulsati per la camera - consentono di aprire la camera del device 
			in poche parole sono dei componenti utili per il contesto mobile ma che non esistono nel contesto web (esistono invece se facciamo uno sviluppo nativo)
			nel main.ts aggiungiamo la riga "defineCustomElements(window);" importando defineCustomElements da @ionic/pwa-elements/loader - e' una specie di 
				polifills per la nostra app
	deploy su ios
		se abbiamo x-code e vogliamo fare il deploy su ios eseguiamo prima il comando "npx cap add ios"
		dopo eseguimo "npx cap open ios"
		il comando "npx capacitor run ios --livereload" serve per lanciare l'app all'interno di un emulatore (serve x-code immagino...)
		con x-code possiamo eseguire il deploy anche sul nostro device fisico (qui serve la licenza dev di apple)
	NOTA: e' possibile introdurre ionic su un progetto gia' esistente, vari package di @ionic sono installabili usando npm 
	NOTA: se un progetto esistente e' molto grande valutare la possibilita' di partire da zero con ionic, e' meglio partire da qualcosa di piccolo e aggiungere 
		la complessita' in modo graduale 
	Ionic gestisce gia' l'autenticazione usando faceID etc.. vedi la documentazione di capacitor 
	Ionic Studio - possibilita' di creare un'app usando semplicemente Drag-and-Drop, utile per creare prototipi senza scrivere il codice 
		magari da usare per fare il prototipo della UI da passare allo sviluppo in un secondo momento 
	continuiamo con vari esempio
		per allineare una icona posizionata nel title (che cmq non e' consigliato) possiamo cambiare il suo stile nel file *.scss del componente 
		per posizionare diversamente gli elementi, aggiungere spazi (es. padding) ionic offre un set di propri classi css
			ion-padding x aggiungere padding 16px tra gli elementi del container 
			ion-text-center x centrare il contenuto che non abbiamo il proprio stile di allineamento
			fare riferimento a https://ionicframework.com/docs/layout/css-utilities per una descrizione dettagliata di classi ionic 
		esempio di utilizzo di ion-grid
			elementi che usiamo sono <ion-grid> <ion-row> <ion-col>
			di default viene seguita la suddivisione x 12 colonne
			possiamo variare la larghezza di una colonna usando le classi simile a quelli di bootstrao (*small, *medium, *large)
			per es. se impostiamo size="6" per una colonna, lo spazio occupato e' la meta di quello a disposizione 
			per settare la larghezza in base allo schermo usiamo attributi size-lg, size-md etc..
			per impostare l'offset di una colonna usiamo l'attributo offset-* (sostituiamo * con dimensioni specifiche, es. md, lg)
			in piu' possiamo cambiare la posizione di una colonna, usando attributo push-*
			questo insieme di proprieta'/attributi ci da una flessibilita di costruire layout che vogliamo
			consultare la documentazione ufficiale per approfondimenti ulteriori...
	per quanto riguarda il deploy dell'app consultare la guida ufficiale
		per pwa https://ionicframework.com/docs/deployment/progressive-web-app (esempio se usiamo firebase, dipende cmq dal hosting provider che usiamo)
		per ios https://ionicframework.com/docs/deployment/app-store
			qui la parte piu' difficile e' quella che riguarda il certificato
			quando abbiamo il certificato configurato usiamo x-code per fare il deploy 
			oppure, se non siamo sul mac, e vogliamo usare le tecniche di ci/cd, possiamo usare appflow - servizio ci/cd offerto da ionic 
		per android https://ionicframework.com/docs/deployment/play-store
	per aggiungere la mappa di google/apple usiamo le API relative, di solito si tratta di avere un container HTML con un id e caricare all'interno di 
		questo contenitore la libreria della mappa - otteniamo la mappa visualizzata all'interno del nostro elemento, la logica di rendering sta nella libreria 
		di google/apple 
		(usiamo javascript mapping library)
		vedi esempio qui https://github.com/ionic-team/ionic-conference-app, https://github.com/ionic-team/ionic-conference-app/tree/master/src/app/pages/map
	NOTA: per cambiare l'icona della nostra app che vediamo sullo schermo del device dobbiamo usare x-code per ios (cartella App/Assets.xcassets)
		e android studio per android 
		ionic fornisce le icone di default ..
		