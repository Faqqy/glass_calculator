
const glass_prices = {
    "glass-type-m1": [
        1260, 1380, 1380, 1610, 2070, 2530, 3450, 4025, 7275, 10095
    ],
    "glass-type-sa": [
        null, null, 2680, 2910, 3370, 3830, 4750, 5325, null, null  
    ],
    "glass-type-br": [
        null, null, 1828.5, 2133.33, 2742.8, 3352.3, 4571.3, 5520, null, null
    ],
    "glass-type-ow": [
        null, null, 2139, 2495.5, 3208.5, 3921.5, 5347.5, 6555, 13380, 19302 
    ],
    "glass-type-bs": [
        null, null, 2580, 2810.5, 3270, 3730, 4650, 5225, null, null
    ],
    "glass-type-sm": [
        null, null, 1828.5, 2133.33, 2742.8, 3352.3, 4571.3, 5520, null, null
    ], 
    "glass-type-dav": [
        630, 690, 690, 805, 1035, 1265, 1725, 2300, 5550, 8370
    ]
}


// Функция, сбрасывающая все элементы в дефолтное состояние
// Она же вызывается при обновлении страницы (внизу body html-файла)
function resetAll() {  
    let itemsAmountInputBox = $('#items-amount')[0];  

    let sizeLengthInputBox = $('#size-length-box')[0];
    let sizeWidthInputBox = $('#size-width-box')[0];

    let thicknessSelectBox = $('#thickness-select-box')[0];  

    let holesSInputBox = $('#holes-s-amount-box')[0];
    let holesMInputBox = $('#holes-m-amount-box')[0];
    let holesLInputBox = $('#holes-l-amount-box')[0];
 
    let connectorsPInputBox = $('#connectors-p-amount')[0]; 
    let connectorsCInputBox = $('#connectors-c-amount')[0]; 

    let glassTypeSelectBox = $('#glass-type-select-box')[0];  

    let angleCheckBoxes = $("input[name='angles-chbxs']");
    let worksCheckBoxes = $("input[name='works-chbxs']");
    let shapeCheckBoxes = $("input[name='shape-chbxs']");



    itemsAmountInputBox.value = 1;

    sizeLengthInputBox.value = 500;
    sizeWidthInputBox.value = 500; 

    thicknessSelectBox.options.selectedIndex = 2;  

    glassTypeSelectBox.options.selectedIndex = 0; 

    holesSInputBox.value = 0;
    holesMInputBox.value = 0;
    holesLInputBox.value = 0;
    
    connectorsPInputBox.value = 0;
    connectorsCInputBox.value = 0;


    if ($("input[name='works-chbxs']:checked")[0] === null ||
        $("input[name='works-chbxs']:checked")[0] === undefined) {
            worksCheckBoxes[0].click();  
    } else {
        if ( $("input[name='works-chbxs']:checked")[0].id !== 'works-pl-chbx' ) { 
            worksCheckBoxes[0].click();
        } 
    }
  
    if ($("input[name='angles-chbxs']:checked")[0] === null || 
        $("input[name='angles-chbxs']:checked")[0] === undefined) {
            angleCheckBoxes[0].click();  
    } else {
        if ( $("input[name='angles-chbxs']:checked")[0].id !== 'angles-1-chbx' ) { 
            angleCheckBoxes[0].click();
        } 
    }

    if ($("input[name='shape-chbxs']:checked")[0] === null || 
        $("input[name='shape-chbxs']:checked")[0] === undefined) {
            shapeCheckBoxes[0].click(); 
    } else {
        if ( $("input[name='shape-chbxs']:checked")[0].id !== 'shape-1-chbx' ) {
            shapeCheckBoxes[0].click(); 
        }  
    } 


    // Запуск расчитывающей функции
    calculateGlassGoods();
}


function calculateGlassGoods() {
 
    
    /* Декларация используемых переменных */

    let itemsAmount = 0;

    let formCosts = 0;
    let works_costs = 0;

    let works_base_cost_pl = 0;
    let works_base_cost_sh = 0;
    let works_base_cost_fg = 0;

    let glass_price = 0;
    let glass_price_per_m = 0;
    let glass_price_dav_per_m = 0;

    let length = 0;
    let width = 0;

    let area = 0;
    let perimeter = 0;

    let thickness = 0;

    let holes_s_amount = 0;
    let holes_m_amount = 0;
    let holes_l_amount = 0;

    let holes_s_price = 0;
    let holes_m_price = 0;
    let holes_l_price = 0;

    let connectorsP = 0;
    let connectorsC = 0;

    let glass_type_costs = 0; 

    let size_pay = 0;

    let moll_price = 0;
    let tempering_price = 0;
    let tempering_base_price = 0;

     
    let price = 0;
    let priceOneItem = 0;  


    let thicknessCoeff = 0;
    let mollCoeff = 0;
    let angleCoeff = 0;
    let sizeCoeff = 0;


    let selectedGlassType = '';


    /* Взятие рабочих элементов страницы */
 
    let totalPriceLabel = $('#total-price')[0];
    let totalPriceOneItemLabel = $('#total-price-one-item')[0]; 

 
    let itemsAmountInputBox = $('#items-amount')[0];  

    let sizeLengthInputBox = $('#size-length-box')[0];
    let sizeWidthInputBox = $('#size-width-box')[0];

    let thicknessSelectBox = $('#thickness-select-box')[0]; 

    let holesSInputBox = $('#holes-s-amount-box')[0];
    let holesMInputBox = $('#holes-m-amount-box')[0];
    let holesLInputBox = $('#holes-l-amount-box')[0];
 
    let connectorsPInputBox = $('#connectors-p-amount')[0]; 
    let connectorsCInputBox = $('#connectors-c-amount')[0]; 

    let glassTypeSelectBox = $('#glass-type-select-box')[0]; 


    let angleCheckBox =  $("input[name='angles-chbxs']:checked")[0];
    let worksCheckBox =   $("input[name='works-chbxs']:checked")[0];
    let shapeCheckBox =   $("input[name='shape-chbxs']:checked")[0];

    /* Расчёт переменных в том же порядке. */
    
    if (angleCheckBox === null || angleCheckBox === undefined) {
        $('#alerts-angles')[0].innerText = 'Укажите угол раскрытия'; 
    } else {
        $('#alerts-angles')[0].innerText = '';  
    }

    if (worksCheckBox === null || worksCheckBox === undefined) {
        $('#alerts-works')[0].innerText = 'Укажите тип обработки'; 
    } else {
        $('#alerts-works')[0].innerText = '';  
    }

    itemsAmount = itemsAmountInputBox.value;

    length = sizeLengthInputBox.value;
    width = sizeWidthInputBox.value;
    
    area = ( length / 1000 ) * ( width / 1000 );
    perimeter = (( length  / 1000 + width  / 1000) * 2);

    switch (true) {
        case area > 0 && area <= 1:
            formCosts = 1000; 
            break; 
        case area > 1 && area <= 1.5:
            formCosts = 1500; 
            break; 
        case area > 1.5 && area <= 2:
            formCosts = 2500; 
            break; 
        case area > 2:
            formCosts = 4000;
            break; 
        default:
            formCosts = 0;
    }
 
    switch (angleCheckBox.id) {
        case 'angles-1-chbx':
            angleCoeff = 1; 
            break; 
        case 'angles-2-chbx':
            angleCoeff = 1.6; 
            break; 
        case 'angles-3-chbx':
            angleCoeff = 2.1; 
            break;  
        default:
            angleCoeff = 1;
    }

 

    switch (thicknessSelectBox.value) {        
        case '2':
            thicknessCoeff = 1; 

            holes_s_price = 70;
            holes_m_price = 110;
            holes_l_price = 150; 

            works_base_cost_pl = 60;
            works_base_cost_sh = 120;
            works_base_cost_fg = 210;
 
            break; 
        case '3':
            thicknessCoeff = 1; 

            holes_s_price = 70;
            holes_m_price = 110;
            holes_l_price = 150;    

            works_base_cost_pl = 60;
            works_base_cost_sh = 120;
            works_base_cost_fg = 210;    
 
            break; 
        case '4':
            thicknessCoeff = 1; 

            holes_s_price = 70;
            holes_m_price = 110;
            holes_l_price = 150; 

            works_base_cost_pl = 60;
            works_base_cost_sh = 120;
            works_base_cost_fg = 210;  

            break; 
        case '5':
            thicknessCoeff = 1; 

            holes_s_price = 70;
            holes_m_price = 110;
            holes_l_price = 150; 

            works_base_cost_pl = 70;
            works_base_cost_sh = 130;
            works_base_cost_fg = 230; 
 
            break; 
        case '6':
            thicknessCoeff = 1; 

            holes_s_price = 70;
            holes_m_price = 110;
            holes_l_price = 150; 

            works_base_cost_pl = 70;
            works_base_cost_sh = 130;
            works_base_cost_fg = 250;  

            break; 
        case '8':
            thicknessCoeff = 1.3; 

            holes_s_price = 110;
            holes_m_price = 150;
            holes_l_price = 250; 

            works_base_cost_pl = 90;
            works_base_cost_sh = 170;
            works_base_cost_fg = 330;  

            break; 
        case '10':
            thicknessCoeff = 1.4; 

            holes_s_price = 110;
            holes_m_price = 150;
            holes_l_price = 250; 

            works_base_cost_pl = 120;
            works_base_cost_sh = 190;
            works_base_cost_fg = 400; 
 
            break; 
        case '12':
            thicknessCoeff = 1.5; 

            holes_s_price = 110;
            holes_m_price = 150;
            holes_l_price = 250; 

            works_base_cost_pl = 290;
            works_base_cost_sh = 550;
            works_base_cost_fg = 910; 
 
            break; 
        case '15':
            thicknessCoeff = 2;

            holes_s_price = 110;
            holes_m_price = 150;
            holes_l_price = 250; 

            works_base_cost_pl = 370;
            works_base_cost_sh = 640;
            works_base_cost_fg = 1210; 
 
            break; 
        case '19':
            thicknessCoeff = 3; 

            holes_s_price = 110;
            holes_m_price = 150;
            holes_l_price = 250;
  
            works_base_cost_pl = 430;
            works_base_cost_sh = 730;
            works_base_cost_fg = 1360; 
 
            break; 
        default:
            thicknessCoeff = 1; 

    }

    holes_s_amount = holesSInputBox.value;
    holes_m_amount = holesMInputBox.value;
    holes_l_amount = holesLInputBox.value;

    switch (worksCheckBox.id) {
        case 'works-pl-chbx':
            works_costs = works_base_cost_pl * perimeter; 
            break; 
        case 'works-sh-chbx':
            works_costs = works_base_cost_sh * perimeter;
            break; 
        case 'works-fg-chbx':
            works_costs = works_base_cost_fg * perimeter;
            break;  
        default:
            works_costs = 0;
    } 
 

    
    switch (shapeCheckBox.id) {
        case 'shape-1-chbx':
            mollCoeff = 1;
            break; 
        case 'shape-2-chbx':
            mollCoeff = 1.3;
            break; 
        case 'shape-3-chbx':
            mollCoeff = 1.5;
            break; 
        case 'shape-4-chbx':
            mollCoeff = 3;
            break; 
        default:
            mollCoeff = 1;
    } 
 
    let max_dimension = Math.max.apply(Math, [length, width]);  
    switch (true) {
        case (max_dimension < 1600):
            sizeCoeff = 1; 
            size_pay = 0;
            break;
        case (max_dimension < 2000):
            sizeCoeff = 1.2;
            size_pay = works_costs * 0.3;
            break;  
        case (max_dimension< 2250):
            sizeCoeff = 1.3;
            size_pay = works_costs * 0.3;
            break;  
        case (max_dimension >= 2250):
            sizeCoeff = 1.5;
            size_pay = works_costs * 0.3;
            break; 
        default:
            sizeCoeff = 1;
            size_pay = 0;
    } 



    switch (glassTypeSelectBox.value) {
        case 'glass-type-m1':
            glass_type_costs = 0;
            thicknessSelectBox.options[0].disabled = false;
            thicknessSelectBox.options[1].disabled = false;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = false;
            thicknessSelectBox.options[9].disabled = false;
            break; 
        case 'glass-type-sa':
            glass_type_costs = 1321.87;
            thicknessSelectBox.options[0].disabled = true;
            thicknessSelectBox.options[1].disabled = true;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = true;
            thicknessSelectBox.options[9].disabled = true;
            break; 
        case 'glass-type-br':
            glass_type_costs = 532.05;
            thicknessSelectBox.options[0].disabled = true;
            thicknessSelectBox.options[1].disabled = true;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = true;
            thicknessSelectBox.options[9].disabled = true;
            break; 
        case 'glass-type-ow':
            glass_type_costs = 900.39;            
            thicknessSelectBox.options[0].disabled = true;
            thicknessSelectBox.options[1].disabled = true;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = false;
            thicknessSelectBox.options[9].disabled = false;
            break; 
        case 'glass-type-bs':
            glass_type_costs = 1220.18;            
            thicknessSelectBox.options[0].disabled = true;
            thicknessSelectBox.options[1].disabled = true;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = true;
            thicknessSelectBox.options[9].disabled = true;
            break; 
        case 'glass-type-sm':
            glass_type_costs = 532.05;
            thicknessSelectBox.options[0].disabled = true;
            thicknessSelectBox.options[1].disabled = true;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = true;
            thicknessSelectBox.options[9].disabled = true;
            break;     
        default:
            glass_type_costs = 0;            
            thicknessSelectBox.options[0].disabled = false;
            thicknessSelectBox.options[1].disabled = false;
            thicknessSelectBox.options[2].disabled = false;
            thicknessSelectBox.options[3].disabled = false;
            thicknessSelectBox.options[4].disabled = false;
            thicknessSelectBox.options[5].disabled = false;
            thicknessSelectBox.options[6].disabled = false;
            thicknessSelectBox.options[7].disabled = false;
            thicknessSelectBox.options[8].disabled = false;
            thicknessSelectBox.options[9].disabled = false;
    }

    if (thicknessSelectBox.options[thicknessSelectBox.selectedIndex].disabled === true) { 
        thicknessSelectBox.selectedIndex = thicknessSelectBox.querySelectorAll('option:enabled')[0].index;
    }

 

    connectorsP = connectorsPInputBox.value;
    connectorsC = connectorsCInputBox.value;

    if ((area * 4980) > 2990) {
        moll_price = area * 4980;
    } else {
        moll_price = 2990;
    }

    moll_price = moll_price * thicknessCoeff * mollCoeff * sizeCoeff * angleCoeff; 

    
   
    
    glass_price_per_m = glass_prices[glassTypeSelectBox[glassTypeSelectBox.selectedIndex].value][thicknessSelectBox.selectedIndex];
    glass_price_dav_per_m = glass_prices['glass-type-dav'][thicknessSelectBox.selectedIndex];

    if (glassTypeSelectBox.value === 'glass-type-dav') {
        glass_price = glass_price_dav_per_m * area;
    } else {
        glass_price = glass_price_per_m * area * 2;  
    }
 
    price = 
        (
            ( 
                (   holes_s_amount * holes_s_price + holes_m_amount * holes_m_price + holes_l_amount * holes_l_price
                    + glass_type_costs
                    + connectorsP * 1200
                    + connectorsC * 500
                    + moll_price 
                    + size_pay
                    + works_costs
                    + glass_price) 
                * itemsAmount) 
            
            + tempering_price 
            + formCosts
        );
    priceOneItem = ( price ) / itemsAmount  ; 

    totalPriceLabel.textContent = (price).toFixed(2) + " ₽";
    totalPriceOneItemLabel.textContent = (priceOneItem).toFixed(2) + " ₽";
    


}

 
