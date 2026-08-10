/**
 * Tablica jednostek dla przelicznika. Prototyp, docelowo src/lib/jednostki/dane.js
 *
 * Pola jednostki:
 *   s  symbol wyswietlany
 *   n  nazwa polska
 *   w  wspolczynnik do jednostki bazowej wymiaru
 *   p  przesuniecie, tylko temperatura
 *   g  grupa: 'm' metryczne, 't' techniczne i polskie, 'i' imperialne
 *   c  czesto uzywana, ma pierwszenstwo w kolejnosci
 *   a  aliasy do wyszukiwania, bez znakow specjalnych
 *
 * Wspolczynniki oznaczone jako dokladne wynikaja z definicji jednostki,
 * na przyklad cal to rowno 25,4 mm, a kgf to rowno 9,80665 N.
 */
const WYMIARY = [
  {id:'dlugosc', nazwa:'Długość', baza:'m', jednostki:[
    {s:'mm', n:'milimetr', w:0.001, g:'m', c:1, a:['milimetry','milimetrow']},
    {s:'cm', n:'centymetr', w:0.01, g:'m', a:['centymetry']},
    {s:'m', n:'metr', w:1, g:'m', c:1, a:['metry','metrow']},
    {s:'km', n:'kilometr', w:1000, g:'m', a:['kilometry']},
    {s:'µm', n:'mikrometr', w:1e-6, g:'m', c:1, a:['um','mikron','mikrometry','mikrometrow']},
    {s:'nm', n:'nanometr', w:1e-9, g:'m', a:['nanometry']},
    {s:'dm', n:'decymetr', w:0.1, g:'m'},
    {s:'cal', n:'cal', w:0.0254, g:'i', c:1, a:['in','inch','cale','cali','"']},
    {s:'mil', n:'tysięczna cala', w:0.0000254, g:'i', a:['thou','tysieczna cala']},
    {s:'stopa', n:'stopa', w:0.3048, g:'i', a:['ft','feet','stopy','stop']},
    {s:'jard', n:'jard', w:0.9144, g:'i', a:['yd','yard','jardy']},
    {s:'mila', n:'mila lądowa', w:1609.344, g:'i', a:['mi','mile']},
    {s:'Mm', n:'mila morska', w:1852, g:'i', a:['nmi','mila morska','wezel drogi']}
  ]},

  {id:'pole', nazwa:'Pole powierzchni', baza:'m²', jednostki:[
    {s:'mm²', n:'milimetr kwadratowy', w:1e-6, g:'m', c:1, a:['mm2','mm^2']},
    {s:'cm²', n:'centymetr kwadratowy', w:1e-4, g:'m', c:1, a:['cm2','cm^2']},
    {s:'dm²', n:'decymetr kwadratowy', w:1e-2, g:'m', a:['dm2']},
    {s:'m²', n:'metr kwadratowy', w:1, g:'m', c:1, a:['m2','m^2']},
    {s:'a', n:'ar', w:100, g:'m'},
    {s:'ha', n:'hektar', w:10000, g:'m', a:['hektary']},
    {s:'km²', n:'kilometr kwadratowy', w:1e6, g:'m', a:['km2']},
    {s:'cal²', n:'cal kwadratowy', w:0.00064516, g:'i', c:1, a:['cal2','in2','sqin','inch2']},
    {s:'stopa²', n:'stopa kwadratowa', w:0.09290304, g:'i', a:['ft2','sqft']},
    {s:'jard²', n:'jard kwadratowy', w:0.83612736, g:'i', a:['yd2']},
    {s:'akr', n:'akr', w:4046.8564224, g:'i', a:['acre']}
  ]},

  {id:'objetosc', nazwa:'Objętość', baza:'m³', jednostki:[
    {s:'mm³', n:'milimetr sześcienny', w:1e-9, g:'m', a:['mm3','mm^3']},
    {s:'cm³', n:'centymetr sześcienny', w:1e-6, g:'m', c:1, a:['cm3','ccm','cc']},
    {s:'dm³', n:'decymetr sześcienny', w:1e-3, g:'m', a:['dm3']},
    {s:'m³', n:'metr sześcienny', w:1, g:'m', c:1, a:['m3','m^3']},
    {s:'ml', n:'mililitr', w:1e-6, g:'m', a:['mililitry']},
    {s:'l', n:'litr', w:1e-3, g:'m', c:1, a:['litr','litry','litrow','dm3']},
    {s:'hl', n:'hektolitr', w:0.1, g:'m'},
    {s:'cal³', n:'cal sześcienny', w:1.6387064e-5, g:'i', a:['cal3','in3','cui']},
    {s:'stopa³', n:'stopa sześcienna', w:0.028316846592, g:'i', a:['ft3','cuft']},
    {s:'gal US', n:'galon amerykański', w:0.003785411784, g:'i', a:['galon','gal','galon us']},
    {s:'gal UK', n:'galon brytyjski', w:0.00454609, g:'i', a:['galon uk','galon imperialny']}
  ]},

  {id:'masa', nazwa:'Masa', baza:'kg', jednostki:[
    {s:'mg', n:'miligram', w:1e-6, g:'m', a:['miligram']},
    {s:'g', n:'gram', w:1e-3, g:'m', c:1, a:['gram','gramy']},
    {s:'dag', n:'dekagram', w:0.01, g:'m', a:['deka']},
    {s:'kg', n:'kilogram', w:1, g:'m', c:1, a:['kilogram','kilogramy','kilo']},
    {s:'t', n:'tona', w:1000, g:'m', c:1, a:['tona','tony']},
    {s:'uncja', n:'uncja', w:0.028349523125, g:'i', a:['oz','ounce','uncje']},
    {s:'funt', n:'funt', w:0.45359237, g:'i', c:1, a:['lb','lbs','pound','funty','funtow']},
    {s:'stone', n:'stone', w:6.35029318, g:'i', a:['st']},
    {s:'ton US', n:'tona amerykańska', w:907.18474, g:'i', a:['short ton','tona us']}
  ]},

  {id:'sila', nazwa:'Siła', baza:'N', jednostki:[
    {s:'N', n:'niuton', w:1, g:'m', c:1, a:['niuton','newton','niutony']},
    {s:'daN', n:'dekaniuton', w:10, g:'m', c:1, a:['dekaniuton']},
    {s:'kN', n:'kiloniuton', w:1000, g:'m', c:1, a:['kiloniuton']},
    {s:'MN', n:'meganiuton', w:1e6, g:'m'},
    {s:'kgf', n:'kilogram siły', w:9.80665, g:'t', c:1, a:['kg','kG','kilogram sily','kilopond','kp','kgs']},
    {s:'lbf', n:'funt siły', w:4.4482216152605, g:'i', c:1, a:['lb','pound force','funt sily']},
    {s:'ozf', n:'uncja siły', w:0.27801385095378125, g:'i', a:['oz force']},
    {s:'kip', n:'kilofunt siły', w:4448.2216152605, g:'i', a:['kips']}
  ]},

  {id:'moment', nazwa:'Moment obrotowy', baza:'N·m', jednostki:[
    {s:'N·m', n:'niutonometr', w:1, g:'m', c:1, a:['nm','niutonometr','newtonometr','n m','n*m']},
    {s:'N·mm', n:'niutonomilimetr', w:0.001, g:'m', a:['nmm','n mm']},
    {s:'kN·m', n:'kiloniutonometr', w:1000, g:'m', a:['knm','kn m']},
    {s:'kgf·m', n:'kilogramometr', w:9.80665, g:'t', c:1, a:['kgm','kgfm','kg m','kilogramometr']},
    {s:'kgf·cm', n:'kilogram siły razy centymetr', w:0.0980665, g:'t', a:['kgcm','kgfcm','kg cm']},
    {s:'lbf·ft', n:'funt siły razy stopa', w:1.3558179483314004, g:'i', c:1, a:['lbfft','lbft','lb ft','ftlb','ft lb','ftlbs','funt stopa']},
    {s:'lbf·in', n:'funt siły razy cal', w:0.1129848290276167, g:'i', c:1, a:['lbfin','lbin','lb in','inlb','in lb']},
    {s:'ozf·in', n:'uncja siły razy cal', w:0.0070615518333333, g:'i', a:['ozin','oz in']}
  ]},

  {id:'cisnienie', nazwa:'Ciśnienie i naprężenie', baza:'Pa', jednostki:[
    {s:'Pa', n:'paskal', w:1, g:'m', a:['paskal','pascal','paskale']},
    {s:'hPa', n:'hektopaskal', w:100, g:'m', a:['hektopaskal']},
    {s:'kPa', n:'kilopaskal', w:1000, g:'m', c:1, a:['kilopaskal']},
    {s:'MPa', n:'megapaskal', w:1e6, g:'m', c:1, a:['megapaskal']},
    {s:'GPa', n:'gigapaskal', w:1e9, g:'m', c:1, a:['gigapaskal']},
    {s:'N/mm²', n:'niuton na milimetr kwadratowy', w:1e6, g:'m', c:1, a:['n/mm2','nmm2','n na mm2']},
    {s:'N/m²', n:'niuton na metr kwadratowy', w:1, g:'m', a:['n/m2','nm2']},
    {s:'bar', n:'bar', w:1e5, g:'m', c:1, a:['bary','barow','barow']},
    {s:'mbar', n:'milibar', w:100, g:'m', c:1, a:['milibar']},
    {s:'at', n:'atmosfera techniczna', w:98066.5, g:'t', c:1, a:['atmosfera techniczna','kgf/cm2','kgcm2','kg/cm2']},
    {s:'atm', n:'atmosfera fizyczna', w:101325, g:'t', a:['atmosfera','atmosfery']},
    {s:'mmHg', n:'milimetr słupa rtęci', w:133.322387415, g:'t', a:['tor','torr','mm hg','mm slupa rteci']},
    {s:'mmH₂O', n:'milimetr słupa wody', w:9.80665, g:'t', a:['mmh2o','mm h2o','mm slupa wody']},
    {s:'mH₂O', n:'metr słupa wody', w:9806.65, g:'t', a:['mh2o','m h2o','msw','metr slupa wody']},
    {s:'kgf/mm²', n:'kilogram siły na milimetr kwadratowy', w:9806650, g:'t', c:1, a:['kgf/mm2','kgmm2','kg/mm2']},
    {s:'kgf/cm²', n:'kilogram siły na centymetr kwadratowy', w:98066.5, g:'t', a:['kgf/cm2','kgcm2','kg/cm2']},
    {s:'psi', n:'funt na cal kwadratowy', w:6894.757293168361, g:'i', c:1, a:['lbf/in2','psig','psia','funt na cal']},
    {s:'ksi', n:'kilofunt na cal kwadratowy', w:6894757.293168361, g:'i', a:['kpsi']},
    {s:'inHg', n:'cal słupa rtęci', w:3386.389, g:'i', a:['in hg','cal slupa rteci']}
  ]},

  {id:'temperatura', nazwa:'Temperatura', baza:'K', temperatura:1, jednostki:[
    {s:'°C', n:'stopień Celsjusza', w:1, p:273.15, g:'m', c:1, a:['c','celsjusz','celsjusza','stopni c','stopnie c','deg c']},
    {s:'K', n:'kelwin', w:1, p:0, g:'m', c:1, a:['kelwin','kelvin','kelwiny']},
    {s:'°F', n:'stopień Fahrenheita', w:5/9, p:255.37222222222223, g:'i', c:1, a:['f','fahrenheit','fahrenheita','stopni f','stopnie f','deg f']},
    {s:'°R', n:'stopień Rankine', w:5/9, p:0, g:'i', a:['rankine','rankina']}
  ]},

  {id:'predkosc', nazwa:'Prędkość', baza:'m/s', jednostki:[
    {s:'m/s', n:'metr na sekundę', w:1, g:'m', c:1, a:['ms','m s','metr na sekunde']},
    {s:'m/min', n:'metr na minutę', w:1/60, g:'m', c:1, a:['mmin','m min','metr na minute']},
    {s:'mm/s', n:'milimetr na sekundę', w:0.001, g:'m', c:1, a:['mms','mm s']},
    {s:'km/h', n:'kilometr na godzinę', w:1/3.6, g:'m', c:1, a:['kmh','km h','kph']},
    {s:'ft/min', n:'stopa na minutę', w:0.00508, g:'i', c:1, a:['ftmin','fpm','sfm']},
    {s:'ipm', n:'cal na minutę', w:0.00042333333333333, g:'i', a:['in/min','cal na minute']},
    {s:'ft/s', n:'stopa na sekundę', w:0.3048, g:'i', a:['fts','fps']},
    {s:'mph', n:'mila na godzinę', w:0.44704, g:'i', a:['mila na godzine']},
    {s:'węzeł', n:'węzeł', w:0.5144444444444445, g:'i', a:['kn','knot','wezel','wezly']}
  ]},

  {id:'obroty', nazwa:'Prędkość obrotowa', baza:'rad/s', jednostki:[
    {s:'obr/min', n:'obrót na minutę', w:0.10471975511965977, g:'m', c:1, a:['rpm','obrmin','obr min','obrotow na minute','1/min']},
    {s:'obr/s', n:'obrót na sekundę', w:6.283185307179586, g:'m', a:['rps','obrs','obr s']},
    {s:'rad/s', n:'radian na sekundę', w:1, g:'m', c:1, a:['rads','rad s','radian na sekunde']},
    {s:'Hz', n:'herc', w:6.283185307179586, g:'m', c:1, a:['herc','hertz','herce']},
    {s:'°/s', n:'stopień na sekundę', w:0.017453292519943295, g:'m', a:['deg/s','stopni na sekunde']}
  ]},

  {id:'przyspieszenie', nazwa:'Przyspieszenie', baza:'m/s²', jednostki:[
    {s:'m/s²', n:'metr na sekundę kwadrat', w:1, g:'m', c:1, a:['ms2','m/s2']},
    {s:'mm/s²', n:'milimetr na sekundę kwadrat', w:0.001, g:'m', a:['mms2','mm/s2']},
    {s:'g', n:'przyspieszenie ziemskie', w:9.80665, g:'t', c:1, a:['g','przyspieszenie ziemskie']},
    {s:'ft/s²', n:'stopa na sekundę kwadrat', w:0.3048, g:'i', a:['fts2','ft/s2']}
  ]},

  {id:'przeplyw', nazwa:'Przepływ objętościowy', baza:'m³/s', jednostki:[
    {s:'l/min', n:'litr na minutę', w:1.6666666666666667e-5, g:'m', c:1, a:['lmin','l min','lpm','litr na minute']},
    {s:'l/s', n:'litr na sekundę', w:0.001, g:'m', c:1, a:['ls','l s']},
    {s:'l/h', n:'litr na godzinę', w:2.7777777777777776e-7, g:'m', a:['lh','l h']},
    {s:'m³/h', n:'metr sześcienny na godzinę', w:2.7777777777777776e-4, g:'m', c:1, a:['m3/h','m3h','m3 h']},
    {s:'m³/min', n:'metr sześcienny na minutę', w:0.016666666666666666, g:'m', a:['m3/min','m3min']},
    {s:'m³/s', n:'metr sześcienny na sekundę', w:1, g:'m', a:['m3/s','m3s']},
    {s:'cm³/min', n:'centymetr sześcienny na minutę', w:1.6666666666666667e-8, g:'m', a:['cm3/min','ccm/min']},
    {s:'cfm', n:'stopa sześcienna na minutę', w:4.719474432e-4, g:'i', c:1, a:['ft3/min','scfm','cfm']},
    {s:'gpm', n:'galon na minutę', w:6.309019640343977e-5, g:'i', a:['gal/min','galon na minute']}
  ]},

  {id:'moc', nazwa:'Moc', baza:'W', jednostki:[
    {s:'W', n:'wat', w:1, g:'m', c:1, a:['wat','watt','waty']},
    {s:'kW', n:'kilowat', w:1000, g:'m', c:1, a:['kilowat','kilowaty']},
    {s:'MW', n:'megawat', w:1e6, g:'m', a:['megawat']},
    {s:'KM', n:'koń mechaniczny', w:735.49875, g:'t', c:1, a:['km','ps','kon mechaniczny','koni','konie']},
    {s:'hp', n:'koń mechaniczny brytyjski', w:745.6998715822702, g:'i', c:1, a:['horsepower','bhp','kon brytyjski']},
    {s:'BTU/h', n:'BTU na godzinę', w:0.29307107017222, g:'i', a:['btuh','btu h']},
    {s:'kcal/h', n:'kilokaloria na godzinę', w:1.163, g:'t', a:['kcalh','kcal h']}
  ]},

  {id:'energia', nazwa:'Energia i praca', baza:'J', jednostki:[
    {s:'J', n:'dżul', w:1, g:'m', c:1, a:['dzul','joule','dzule']},
    {s:'kJ', n:'kilodżul', w:1000, g:'m', c:1, a:['kilodzul']},
    {s:'MJ', n:'megadżul', w:1e6, g:'m', a:['megadzul']},
    {s:'Wh', n:'watogodzina', w:3600, g:'m', a:['watogodzina']},
    {s:'kWh', n:'kilowatogodzina', w:3.6e6, g:'m', c:1, a:['kilowatogodzina','kwh']},
    {s:'cal', n:'kaloria', w:4.1868, g:'t', a:['kaloria','kalorie']},
    {s:'kcal', n:'kilokaloria', w:4186.8, g:'t', c:1, a:['kilokaloria','kalorie']},
    {s:'BTU', n:'brytyjska jednostka ciepła', w:1055.05585262, g:'i', a:['btu']},
    {s:'kgf·m', n:'kilogramometr', w:9.80665, g:'t', a:['kgm','kilogramometr']}
  ]},

  {id:'gestosc', nazwa:'Gęstość', baza:'kg/m³', jednostki:[
    {s:'kg/m³', n:'kilogram na metr sześcienny', w:1, g:'m', c:1, a:['kg/m3','kgm3']},
    {s:'g/cm³', n:'gram na centymetr sześcienny', w:1000, g:'m', c:1, a:['g/cm3','gcm3','g/ccm']},
    {s:'kg/dm³', n:'kilogram na decymetr sześcienny', w:1000, g:'m', a:['kg/dm3','kgdm3']},
    {s:'t/m³', n:'tona na metr sześcienny', w:1000, g:'m', a:['t/m3','tm3']},
    {s:'lb/ft³', n:'funt na stopę sześcienną', w:16.018463373960142, g:'i', a:['lb/ft3','lbft3','pcf']},
    {s:'lb/in³', n:'funt na cal sześcienny', w:27679.904710203122, g:'i', a:['lb/in3','lbin3']}
  ]},

  {id:'kat', nazwa:'Kąt', baza:'rad', jednostki:[
    {s:'°', n:'stopień', w:0.017453292519943295, g:'m', c:1, a:['stopien','stopnie','stopni','deg']},
    {s:'rad', n:'radian', w:1, g:'m', c:1, a:['radian','radiany']},
    {s:'′', n:'minuta kątowa', w:2.908882086657216e-4, g:'m', a:['minuta katowa','arcmin']},
    {s:'″', n:'sekunda kątowa', w:4.84813681109536e-6, g:'m', a:['sekunda katowa','arcsec']},
    {s:'grad', n:'grad', w:0.015707963267948967, g:'m', a:['gon','grady']},
    {s:'obrót', n:'pełny obrót', w:6.283185307179586, g:'m', a:['obrot','obroty','rev']}
  ]},

  {id:'czas', nazwa:'Czas', baza:'s', jednostki:[
    {s:'ms', n:'milisekunda', w:0.001, g:'m', c:1, a:['milisekunda','milisekundy']},
    {s:'s', n:'sekunda', w:1, g:'m', c:1, a:['sekunda','sekundy','sek']},
    {s:'min', n:'minuta', w:60, g:'m', c:1, a:['minuta','minuty']},
    {s:'h', n:'godzina', w:3600, g:'m', c:1, a:['godzina','godziny','godz']},
    {s:'doba', n:'doba', w:86400, g:'m', a:['dzien','dni','day']}
  ]},

  {id:'bezwladnosc', nazwa:'Moment bezwładności', baza:'kg·m²', jednostki:[
    {s:'kg·m²', n:'kilogram razy metr kwadratowy', w:1, g:'m', c:1, a:['kgm2','kg m2']},
    {s:'kg·cm²', n:'kilogram razy centymetr kwadratowy', w:1e-4, g:'m', c:1, a:['kgcm2','kg cm2']},
    {s:'g·cm²', n:'gram razy centymetr kwadratowy', w:1e-7, g:'m', a:['gcm2','g cm2']},
    {s:'lb·ft²', n:'funt razy stopa kwadratowa', w:0.042140110093804, g:'i', a:['lbft2']},
    {s:'lb·in²', n:'funt razy cal kwadratowy', w:2.9263965122e-4, g:'i', a:['lbin2']}
  ]},

  {id:'sztywnosc', nazwa:'Sztywność sprężyny', baza:'N/m', jednostki:[
    {s:'N/mm', n:'niuton na milimetr', w:1000, g:'m', c:1, a:['nmm','n/mm','n mm']},
    {s:'N/m', n:'niuton na metr', w:1, g:'m', c:1, a:['nm','n/m']},
    {s:'kN/mm', n:'kiloniuton na milimetr', w:1e6, g:'m', a:['knmm','kn/mm']},
    {s:'kgf/mm', n:'kilogram siły na milimetr', w:9806.65, g:'t', c:1, a:['kgmm','kg/mm']},
    {s:'lbf/in', n:'funt siły na cal', w:175.12683524648, g:'i', a:['lbin','lb/in']}
  ]},

  {id:'lepkosc', nazwa:'Lepkość kinematyczna', baza:'m²/s', jednostki:[
    {s:'mm²/s', n:'milimetr kwadratowy na sekundę', w:1e-6, g:'m', c:1, a:['mm2/s','mm2s']},
    {s:'cSt', n:'centystokes', w:1e-6, g:'t', c:1, a:['cst','centystokes']},
    {s:'St', n:'stokes', w:1e-4, g:'t', a:['stokes']},
    {s:'m²/s', n:'metr kwadratowy na sekundę', w:1, g:'m', a:['m2/s','m2s']}
  ]}
];

const GRUPY = {
  m: 'metryczne',
  t: 'techniczne i polskie',
  i: 'imperialne'
};

if (typeof module !== 'undefined') module.exports = {WYMIARY, GRUPY};
