interface MovieProjector {
    void startProjection();
    void stopProjection();
    void checkProjectorStatus( String projectorID);
}

// Interfaz para el vendedor de boletos
interface TicketSeller {
    void sellTicket();
    void refundTicket();
    void checkTicketAvailability(String movieID);
}

// Interfaz para el personal de concesión
interface ConcessionStandWorker {
    void serveSnack();
    void restockItems();
    void processPayment();
}
class MovieProjectorOperator implements MovieProjector {

    public void startProjection() {
        // Implementación específica para iniciar la proyección de películas
        System.out.println("Se inicio la funcion");
    }

    public void stopProjection() {
        // Implementación específica para detener la proyección de películas
        System.out.println("Se termino la funcion");
    }

    public void checkProjectorStatus(String projectorID) {
        // Implementación específica para verificar el estado del proyector
        System.out.println("El proyector " + projectorID + " esta en bue estado");
    }
}

// Clase para el vendedor de boletos
class TicketSellerEmployee implements TicketSeller {
    public void sellTicket() {
        // Implementación específica para vender boletos
        System.out.println(" Un ticket vendido ");
    }

    public void refundTicket() {
        // Implementación específica para reembolsar boletos
        System.out.println(" Un ticket retornado ");
    }

    public void checkTicketAvailability(Stirng movieID) {
        System.out.println("Hay tickets disponibles para "+ movieID + " .");
    }
}

// Clase para el personal de concesión
class ConcessionStandWorkerEmployee implements ConcessionStandWorker {

    public void serveSnack() {
        // Implementación específica para servir snacks
        System.out.println("Snack servido");
    }

    public void restockItems() {
        // Implementación específica para reponer productos en la concesión
        System.out.println("Stock relleno");
    }

    public void processPayment() {
        // Implementación específica para procesar pagos en la concesión
        System.out.println("Pago procesado");
    }
}