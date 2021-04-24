import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

export function Header(){

    const currentDate = format(new Date(),'EEEEEE,d MMMM ',{
        locale:ptBr,
    });

    return(
        <header className={styles.headerContainer} >
            <img src="/logo.svg" alt="Podcast"/>

            <p>O melhor para você ouvir sempre</p>

            <span>{currentDate}</span>

            <button className={styles.menu}>
                <img src="/menu.svg" alt="Botao menu"/>
            </button>
        </header>
    )
}