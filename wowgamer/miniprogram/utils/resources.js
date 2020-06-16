"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderImgPaths;
(function (OrderImgPaths) {
    OrderImgPaths["Paladin"] = "1.png";
    OrderImgPaths["Warrior"] = "2.png";
    OrderImgPaths["DeathKnight"] = "3.png";
    OrderImgPaths["Hunter"] = "4.png";
    OrderImgPaths["Shaman"] = "5.png";
    OrderImgPaths["Rogue"] = "6.png";
    OrderImgPaths["Dryad"] = "7.png";
    OrderImgPaths["DemonHunter"] = "8.png";
    OrderImgPaths["Mage"] = "9.png";
    OrderImgPaths["Priest"] = "10.png";
    OrderImgPaths["Warlock"] = "11.png";
    OrderImgPaths["Monk"] = "12.png";
})(OrderImgPaths || (OrderImgPaths = {}));
var CharacterImgPaths;
(function (CharacterImgPaths) {
    CharacterImgPaths["Paladin"] = "c1.jpg";
    CharacterImgPaths["Warrior"] = "c2.jpg";
    CharacterImgPaths["DeathKnight"] = "c3.jpg";
    CharacterImgPaths["Hunter"] = "c4.jpg";
    CharacterImgPaths["Shaman"] = "c5.jpg";
    CharacterImgPaths["Rogue"] = "c6.jpg";
    CharacterImgPaths["Dryad"] = "c7.jpg";
    CharacterImgPaths["DemonHunter"] = "c8.jpg";
    CharacterImgPaths["Mage"] = "c9.jpg";
    CharacterImgPaths["Priest"] = "c10.jpg";
    CharacterImgPaths["Warlock"] = "c11.jpg";
    CharacterImgPaths["Monk"] = "c12.jpg";
})(CharacterImgPaths || (CharacterImgPaths = {}));
exports.getResources = (name, type) => {
    if (type == 'order') {
        switch (name) {
            case '1':
                return OrderImgPaths.Paladin;
                break;
            case '2':
                return OrderImgPaths.Warrior;
                break;
            case '3':
                return OrderImgPaths.DeathKnight;
                break;
            case '4':
                return OrderImgPaths.Hunter;
                break;
            case '5':
                return OrderImgPaths.Shaman;
                break;
            case '6':
                return OrderImgPaths.Rogue;
                break;
            case '7':
                return OrderImgPaths.Dryad;
                break;
            case '8':
                return OrderImgPaths.DemonHunter;
                break;
            case '9':
                return OrderImgPaths.Mage;
                break;
            case '10':
                return OrderImgPaths.Priest;
                break;
            case '11':
                return OrderImgPaths.Warlock;
                break;
            case '12':
                return OrderImgPaths.Monk;
                break;
        }
    }
    else if (type == 'character') {
        switch (name) {
            case '1':
                return CharacterImgPaths.Paladin;
                break;
            case '2':
                return CharacterImgPaths.Warrior;
                break;
            case '3':
                return CharacterImgPaths.DeathKnight;
                break;
            case '4':
                return CharacterImgPaths.Hunter;
                break;
            case '5':
                return CharacterImgPaths.Shaman;
                break;
            case '6':
                return CharacterImgPaths.Rogue;
                break;
            case '7':
                return CharacterImgPaths.Dryad;
                break;
            case '8':
                return CharacterImgPaths.DemonHunter;
                break;
            case '9':
                return CharacterImgPaths.Mage;
                break;
            case '10':
                return CharacterImgPaths.Priest;
                break;
            case '11':
                return CharacterImgPaths.Warlock;
                break;
            case '12':
                return CharacterImgPaths.Monk;
                break;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSyxhQWFKO0FBYkQsV0FBSyxhQUFhO0lBQ2hCLGtDQUFnQixDQUFBO0lBQ2hCLGtDQUFnQixDQUFBO0lBQ2hCLHNDQUFvQixDQUFBO0lBQ3BCLGlDQUFlLENBQUE7SUFDZixpQ0FBZSxDQUFBO0lBQ2YsZ0NBQWMsQ0FBQTtJQUNkLGdDQUFjLENBQUE7SUFDZCxzQ0FBb0IsQ0FBQTtJQUNwQiwrQkFBYSxDQUFBO0lBQ2Isa0NBQWdCLENBQUE7SUFDaEIsbUNBQWlCLENBQUE7SUFDakIsZ0NBQWMsQ0FBQTtBQUNoQixDQUFDLEVBYkksYUFBYSxLQUFiLGFBQWEsUUFhakI7QUFDRCxJQUFLLGlCQWFKO0FBYkQsV0FBSyxpQkFBaUI7SUFDcEIsdUNBQWlCLENBQUE7SUFDakIsdUNBQWlCLENBQUE7SUFDakIsMkNBQXFCLENBQUE7SUFDckIsc0NBQWdCLENBQUE7SUFDaEIsc0NBQWdCLENBQUE7SUFDaEIscUNBQWUsQ0FBQTtJQUNmLHFDQUFlLENBQUE7SUFDZiwyQ0FBcUIsQ0FBQTtJQUNyQixvQ0FBYyxDQUFBO0lBQ2QsdUNBQWlCLENBQUE7SUFDakIsd0NBQWtCLENBQUE7SUFDbEIscUNBQWUsQ0FBQTtBQUNqQixDQUFDLEVBYkksaUJBQWlCLEtBQWpCLGlCQUFpQixRQWFyQjtBQUVZLFFBQUEsWUFBWSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ3pELElBQUcsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUNsQixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssR0FBRztnQkFDTixPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUE7Z0JBQzVCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFBO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLE9BQU8sYUFBYSxDQUFDLFdBQVcsQ0FBQTtnQkFDaEMsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUE7Z0JBQzNCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFBO2dCQUMzQixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQTtnQkFDMUIsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUE7Z0JBQzFCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxhQUFhLENBQUMsV0FBVyxDQUFBO2dCQUNoQyxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQTtnQkFDekIsTUFBTTtZQUNSLEtBQUssSUFBSTtnQkFDUCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUE7Z0JBQzNCLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFBO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQTtnQkFDekIsTUFBTTtTQUNUO0tBQ0Y7U0FBTSxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUU7UUFDOUIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUE7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUE7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxXQUFXLENBQUE7Z0JBQ3BDLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxNQUFNLENBQUE7Z0JBQy9CLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxNQUFNLENBQUE7Z0JBQy9CLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUE7Z0JBQzlCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUE7Z0JBQzlCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxXQUFXLENBQUE7Z0JBQ3BDLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUE7Z0JBQzdCLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxpQkFBaUIsQ0FBQyxNQUFNLENBQUE7Z0JBQy9CLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUE7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUE7Z0JBQzdCLE1BQU07U0FDVDtLQUNGO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZW51bSBPcmRlckltZ1BhdGhze1xyXG4gIFBhbGFkaW49ICcxLnBuZycsIC8v5Zyj6aqR5aOrXHJcbiAgV2Fycmlvcj0gJzIucG5nJywgLy/miJjlo6tcclxuICBEZWF0aEtuaWdodD0gJzMucG5nJywgLy/mrbvkuqHpqpHlo6tcclxuICBIdW50ZXI9ICc0LnBuZycsIC8v54yO5Lq6XHJcbiAgU2hhbWFuPSAnNS5wbmcnLCAvL+iQqOa7oeelreWPuFxyXG4gIFJvZ3VlPSAnNi5wbmcnLCAvL+a9nOihjOiAhVxyXG4gIERyeWFkPSAnNy5wbmcnLCAvL+W+t+mygeS8ilxyXG4gIERlbW9uSHVudGVyPSAnOC5wbmcnLCAvL+aBtumtlOeMjuaJi1xyXG4gIE1hZ2U9ICc5LnBuZycsIC8v5rOV5biIXHJcbiAgUHJpZXN0PSAnMTAucG5nJywgLy/niafluIhcclxuICBXYXJsb2NrPSAnMTEucG5nJywgLy/mnK/lo6tcclxuICBNb25rPSAnMTIucG5nJywgLy/mrablg6dcclxufVxyXG5lbnVtIENoYXJhY3RlckltZ1BhdGhze1xyXG4gIFBhbGFkaW49ICdjMS5qcGcnLCAvL+Wco+mqkeWjq1xyXG4gIFdhcnJpb3I9ICdjMi5qcGcnLCAvL+aImOWjq1xyXG4gIERlYXRoS25pZ2h0PSAnYzMuanBnJywgLy/mrbvkuqHpqpHlo6tcclxuICBIdW50ZXI9ICdjNC5qcGcnLCAvL+eMjuS6ulxyXG4gIFNoYW1hbj0gJ2M1LmpwZycsIC8v6JCo5ruh56Wt5Y+4XHJcbiAgUm9ndWU9ICdjNi5qcGcnLCAvL+a9nOihjOiAhVxyXG4gIERyeWFkPSAnYzcuanBnJywgLy/lvrfpsoHkvIpcclxuICBEZW1vbkh1bnRlcj0gJ2M4LmpwZycsIC8v5oG26a2U54yO5omLXHJcbiAgTWFnZT0gJ2M5LmpwZycsIC8v5rOV5biIXHJcbiAgUHJpZXN0PSAnYzEwLmpwZycsIC8v54mn5biIXHJcbiAgV2FybG9jaz0gJ2MxMS5qcGcnLCAvL+acr+Wjq1xyXG4gIE1vbms9ICdjMTIuanBnJywgLy/mrablg6dcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFJlc291cmNlcyA9IChuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZykgPT4ge1xyXG4gIGlmKHR5cGUgPT0gJ29yZGVyJykge1xyXG4gICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgIHJldHVybiBPcmRlckltZ1BhdGhzLlBhbGFkaW5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgcmV0dXJuIE9yZGVySW1nUGF0aHMuV2FycmlvclxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICczJzpcclxuICAgICAgICByZXR1cm4gT3JkZXJJbWdQYXRocy5EZWF0aEtuaWdodFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc0JzpcclxuICAgICAgICByZXR1cm4gT3JkZXJJbWdQYXRocy5IdW50ZXJcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnNSc6XHJcbiAgICAgICAgcmV0dXJuIE9yZGVySW1nUGF0aHMuU2hhbWFuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgIHJldHVybiBPcmRlckltZ1BhdGhzLlJvZ3VlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzcnOlxyXG4gICAgICAgIHJldHVybiBPcmRlckltZ1BhdGhzLkRyeWFkXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzgnOlxyXG4gICAgICAgIHJldHVybiBPcmRlckltZ1BhdGhzLkRlbW9uSHVudGVyXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzknOlxyXG4gICAgICAgIHJldHVybiBPcmRlckltZ1BhdGhzLk1hZ2VcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnMTAnOlxyXG4gICAgICAgIHJldHVybiBPcmRlckltZ1BhdGhzLlByaWVzdFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICcxMSc6XHJcbiAgICAgICAgcmV0dXJuIE9yZGVySW1nUGF0aHMuV2FybG9ja1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICcxMic6XHJcbiAgICAgICAgcmV0dXJuIE9yZGVySW1nUGF0aHMuTW9ua1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSAnY2hhcmFjdGVyJykge1xyXG4gICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5QYWxhZGluXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzInOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5XYXJyaW9yXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5EZWF0aEtuaWdodFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc0JzpcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVySW1nUGF0aHMuSHVudGVyXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzUnOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5TaGFtYW5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnNic6XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3RlckltZ1BhdGhzLlJvZ3VlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzcnOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5EcnlhZFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc4JzpcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVySW1nUGF0aHMuRGVtb25IdW50ZXJcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnOSc6XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3RlckltZ1BhdGhzLk1hZ2VcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnMTAnOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5Qcmllc3RcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnMTEnOlxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJJbWdQYXRocy5XYXJsb2NrXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzEyJzpcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVySW1nUGF0aHMuTW9ua1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==