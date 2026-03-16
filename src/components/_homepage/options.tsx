import { useEffect} from "react";
import styles from '@/styles/menu.module.css';

function Menu(props: {
    bodyJSX: string,
    setBodyJSX: React.Dispatch<React.SetStateAction<string>>;
    keys: string[];    
    isKeyExist: (keyStr :string) => boolean;
}) {


    const {setBodyJSX, isKeyExist} = props;
    useEffect(() => {
        const changeKeybyHash = (name: string) => {
            name = name.substring(1).toLowerCase(); // Set the menu item to the url extension, all lowercase
    
            if (name === "") setBodyJSX("home"); // If empty auto to home
            else if (isKeyExist(name)) setBodyJSX(name); // If exist set body to matching menu item
        };

        const handleHashChange = () => {
            changeKeybyHash(window.location.hash); // Reads current URL hash
        };
        window.addEventListener('hashchange', handleHashChange); // Checks for # change
        handleHashChange(); // Call it once immediately incase someone visits /# directly
        return () => {
          window.removeEventListener('hashchange', handleHashChange);
        };
      }, [setBodyJSX, isKeyExist]);

    return (
        <div className={styles.menudiv}>
            <ul>
            {/* 
            Loop through the array of menu keys passed in props.
            Creates one <li> element for each key.
            */}    
            {props.keys.map((key, index) => { 
                 const keyL = key.toLowerCase();
                    return (
                        // If active menu item apply unique styling and set the url hash to this
                        <li key={`menuitem${index}`} className={props.bodyJSX === keyL ? styles.selectedoption : styles.menuitem}>
                        <a href={`#${keyL}`} >
                            ./{key}
                        </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Menu;
