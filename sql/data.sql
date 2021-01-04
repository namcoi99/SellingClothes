-- Product
-- Shirt

use WebCSDL

-- Shirt
INSERT INTO Product
VALUES 
(N'Blue Tshirt','299000',N'ClownZ x Collectors Tie Dye Tee Flame Dices','shirt1','Shirt','6'),
(N'Black Tshirt','145000',N'Pepsi x ClownZ Laugh Now T-shirt','shirt2','Shirt','7'),
(N'Oversize T-shirt','250000',N'Pepsi x ClownZ Disorted T-shirt','shirt3','Shirt','8'),
(N'White T-shirt','169000',N'ClownZ Terraria Camouflage T-shirt','shirt4','Shirt','0'),
(N'Brumano','230000',N'Basebal Typography T-shirt','shirt5','Shirt','15')

-- Pants
INSERT INTO Product
VALUES
(N'Nike x Undercover','299000',N'The latest partnership between Jun Takahashi and Nike redefines wet-weather gear.','pants1','Pants','6'),
(N'Jordan AJ11 Graphic','145000',N'Make a match in the Jordan AJ11 Graphic Fleece Trousers, featuring prints inspired by the iconic game shoe.','pants2','Pants','7'),
(N'Jordan AJ4','250000',N'The Jordan AJ4 Graphic Fleece Trousers are cuffed around the ankles so they dont get in the way of your Js.','pants3','Pants','8'),
(N'Nike ACG Polartec Wolf Tree','169000',N'Wet weather doesnt mean you have to stop exploring.','pants4','Pants','0'),
(N'Nike Sportswear Windrunner','230000',N'The Nike Sportswear Windrunner Trousers are made from lightweight nylon fabric for a relaxed, comfortable feel.','pants5','Pants','15')

-- Bag
INSERT INTO Product
VALUES 
(N'Tech Pack','78000',N'The Tech Pack is designed to organize and protect all your tech essentials.','bag1','Bag','25'),
(N'Gucci Womens Crocodile Bamboo Convertible Handbag','58000',N'This handbag is as beautiful as it is stunning. The crocodile bears shades of both vanilla cream and a light shade grey.','bag2','Bag','33'),
(N'Judith Leiber Nabila Crocodile Exotic Shoulder Bag Mocha','46000',N'When you need a small purse but dont want to sacrifice style, this one is the way to go.','bag3','Bag','10'),
(N'Light Pink Crocodile Bamboo Convertible Handbag','42000',N'This small bag has a warm, friendly tone. The crocodile texture is soft pink, giving it a more natural and organic feel.','bag4','Bag','5'),
(N'Small Pink Crocodile Bamboo Convertible Handbag','69000',N'When subtlety isnt your specialty and understated isnt your style, then even your small purses need to be loud.','bag5','Bag','21')

select * from Product